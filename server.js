import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const connection_url = process.env.MONGO_URL;

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connection_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//API Endpoints

app.get("/", (req, res) => {
  res.status(200).send("Hello WebDev");
});

app.post("/dating/cards", async (req, res) => {
  const dbCard = req.body;
  try {
    const data = await Cards.create(dbCard);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/dating/cards", async (req, res) => {
  const dbCard = req.body;
  try {
    const data = await Cards.find(dbCard);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
  });
});
