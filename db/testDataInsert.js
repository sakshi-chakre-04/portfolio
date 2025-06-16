import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../model/userModel.js';

// Load environment variables
dotenv.config();

const testDataInsert = async () => {
    try {
        // Connect to MongoDB
        const DATABASEURL = process.env.MONGODB_URI;
        await mongoose.connect(DATABASEURL, {
            dbName: 'portfolio',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Create test data matching the user schema
        const testData = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Website Inquiry',
                message: 'I would like to know more about your services.'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                subject: 'Project Discussion',
                message: 'Interested in discussing a potential project.'
            },
            {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                subject: 'Job Opportunity',
                message: 'We have a position that might interest you.'
            }
        ];

        // Insert the data
        const result = await UserModel.insertMany(testData);
        console.log('✅ Successfully inserted test data:');
        console.log(result);

        // Fetch and display all documents
        const allDocuments = await UserModel.find({});
        console.log('\n📋 All documents in the database:');
        console.log(allDocuments);

        // Close the connection
        await mongoose.connection.close();
        console.log('\n✅ Connection closed successfully');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// Run the test
testDataInsert(); 