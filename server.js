import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import importData from "./dataImport.js";
import userRoute from "./routers/userRoute.js";
import cors from "cors";
import conversationRoute from "./routers/conversationRouter.js";
import messageRoute from "./routers/messageRouter.js";
import fileRoute from "./routers/fileRouter.js";
import { Server } from 'socket.io';

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//api
app.use("/api/import", importData);
app.use("/api/user", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/conversation", messageRoute);
app.use("/api/conversation", fileRoute);

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log("server running in port "+ PORT));

//socket connection

const io = new Server(server,{
    cors: {
        origin:  "http://localhost:3000"
    }
});

var users = [];

function addUser(userData, socketId){
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId });
}

function getUser(userId){
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.on("addUsers", userData =>{
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", data =>{
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit("getMessage", data);
    });
})

