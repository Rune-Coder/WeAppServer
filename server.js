import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import importData from "./dataImport.js";
import userRoute from "./routers/userRoute.js";
import cors from "cors";

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//api
app.use("/api/import", importData);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running in port "+ PORT));

