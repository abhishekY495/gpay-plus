import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to GPay plus");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
