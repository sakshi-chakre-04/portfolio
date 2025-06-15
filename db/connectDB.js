import mongoose from 'mongoose';

const connectDB = async (DATABASEURL) => {
    try {
        // Previous configuration
        // const DB_OPTIONS = {
        //     dbName: 'portfolio',
        // }
        // const data = await mongoose.connect(DATABASEURL, DB_OPTIONS) //promise returns value
        // if (data) {
        //     console.log("Database connection successful...")
        // }

        // New MongoDB Atlas configuration
        const DB_OPTIONS = {
            dbName: 'portfolio',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };
        
        const data = await mongoose.connect(DATABASEURL, DB_OPTIONS);
        if (data) {
            console.log("Database connection successful...");
        }

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000); // Retry connection after 5 seconds
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        // Don't exit the process, let the application handle the error
        throw error;
    }
};

export default connectDB;