import connectDB from './connectDB.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// testConnection.js
dotenv.config();
const DATABASEURL = 'mongodb+srv://sakshichakre0421:rchAp3KidMpKB0VR@cluster1.m3si1wf.mongodb.net/portfolio';

const testConnection = async () => {
    try {
        await mongoose.connect(DATABASEURL, {
            dbName: 'portfolio',
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Connected to MongoDB Atlas successfully!');
        mongoose.disconnect(); // Close after check
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
    }
};

testConnection();
