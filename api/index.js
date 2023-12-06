import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log(`Server connected to MongoDB`);
    }).catch((error)=>{
        console.log(`Error occurred during database connection: ${error}`);
    })

const app = express();

// middlewares
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, ()=>{
    console.log(`Server is listening on port 3000`);
});