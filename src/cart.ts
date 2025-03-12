import express from "express";
import client from "./db";

const router = express.Router();

router.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    await client.execute(
      "INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, productId, quantity],
      { prepare: true }
    );
    res.json({ message: "Item added to cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await client.execute(
      "SELECT * FROM carts WHERE user_id = ?",
      [userId],
      { prepare: true }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await client.execute(
      "DELETE FROM carts WHERE user_id = ? AND product_id = ?",
      [userId, productId],
      { prepare: true }
    );
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
