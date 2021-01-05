import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";
import connectDB from "./db";
import auth from "./routes/auth";
import users from "./routes/users";
import books from "./routes/books";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
connectDB();
console.log("test98", process.env.MONGODB_URL, { useMongoClient: true });

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

app.post("/api/auth", (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(8080, () => console.log("Running on localhost:8080"));
