import mongoose from 'mongoose';

const connectDB=async(DATABASEURL)=>{
    const DB_OPTIONS={
        dbName:'portfolio',
    }
    try {
        const data = await mongoose.connect(DATABASEURL, DB_OPTIONS);
        console.log("Database connection successful...");
    } catch (error) {
        console.error("Database connection failed. Check your DATABASE_URL environment variable.");
        console.error(error.message);
        // We do not exit the process here so the portfolio still loads even if the DB is down!
    }
}
export default connectDB;