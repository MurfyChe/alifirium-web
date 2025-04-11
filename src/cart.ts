// src/routes/cart.ts
import express from "express";
import { client } from "./cassandra"; // conexiune Cassandra
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Get cart items
router.get("/", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM cart", [], { prepare: true });
    res.json(result.rows);
  } catch (err: any) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
