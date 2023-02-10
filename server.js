import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";

dotenv.config();
connectDatabase();

const app = express();

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running in port "+ PORT));

