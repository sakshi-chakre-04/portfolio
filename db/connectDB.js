import mongoose from 'mongoose';

const connectDB=async(DATABASEURL)=>{
    const DB_OPTIONS={
        dbName:'portfolio',
    }
    const data=await mongoose.connect(DATABASEURL,DB_OPTIONS)//promise returns value
    if (data){
        console.log("Database connection successful...")
    }
}
export default connectDB;