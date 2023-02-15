import express from 'express';
import asyncHandler from 'express-async-handler';
import url from '../config/connect.js';
import uploadMiddleware from '../utils/uploadMiddleware.js';
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const fileRoute = express.Router();

var gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

// send file
fileRoute.post("/file-upload", uploadMiddleware.single('file'),
    asyncHandler(async (req, res)=>{
        try{
            if(!req.file)
                return res.status(404).json("File not found");

            const imgUrl = `${url}/file/${req.file.filename}`;

            return res.status(200).json(imgUrl);

        }catch(error){
            console.log(error);
        }
        
    })
);

// get file
fileRoute.get("/file-get",
    asyncHandler(async (req, res)=>{
        try{

            const file = await gfs.files.findOne({ filename: req.query.filename});

            const readStream = gridFsBucket.openDownloadStream(file._id);
            readStream.pipe(res);

        }catch(error){
            console.log(error);
        }
        
    })
);

export default fileRoute;