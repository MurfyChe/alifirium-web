import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./auth";
import cartRoutes from "./cart";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
