// src/routes/auth.ts
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cassandra from "cassandra-driver";
import { client } from "./cassandra";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await client.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      { prepare: true }
    );

    if (existing.rowLength > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = cassandra.types.Uuid.random();

    await client.execute(
      "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
      [id, email, hashedPassword],
      { prepare: true }
    );

    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      { prepare: true }
    );

    if (result.rowLength === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
