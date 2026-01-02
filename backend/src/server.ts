// Firmos backend entry point
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Firmos backend running",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Firmos backend started on port ${PORT}`);
});
