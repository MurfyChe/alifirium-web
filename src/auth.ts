import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "./db";

const router = express.Router();
const SECRET = "your_jwt_secret";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = cassandra.types.Uuid.random();
  
  try {
    await client.execute(
      "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
      [id, email, hashedPassword],
      { prepare: true }
    );
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await client.execute("SELECT * FROM users WHERE email = ?", [email], { prepare: true });
  if (result.rowLength === 0) return res.status(401).json({ error: "Invalid email" });

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
