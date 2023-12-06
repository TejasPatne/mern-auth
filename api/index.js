import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log(`Server connected to MongoDB`);
    }).catch((error)=>{
        console.log(`Error occurred during database connection: ${error}`);
    })

const app = express();

app.listen(3000, ()=>{
    console.log(`Server is listening on port 3000`);
});