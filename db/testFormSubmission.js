import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../model/userModel.js';

// Load environment variables
dotenv.config();

const testFormSubmission = async () => {
    try {
        // Connect to MongoDB
        const DATABASEURL = process.env.MONGODB_URI;
        await mongoose.connect(DATABASEURL, {
            dbName: 'portfolio',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Test Case 1: Valid form submission
        console.log('\n📝 Test Case 1: Valid form submission');
        const validData = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'This is a test message'
        };

        const validUser = new UserModel(validData);
        await validUser.save();
        console.log('✅ Valid form submission successful!');
        console.log('Saved data:', validUser);

        // Test Case 2: Invalid email format
        console.log('\n📝 Test Case 2: Invalid email format');
        try {
            const invalidEmailData = {
                name: 'Invalid User',
                email: 'invalid-email',
                subject: 'Invalid Email Test',
                message: 'Testing invalid email'
            };
            const invalidUser = new UserModel(invalidEmailData);
            await invalidUser.save();
        } catch (error) {
            console.log('✅ Invalid email test passed!');
            console.log('Error message:', error.message);
        }

        // Test Case 3: Missing required fields
        console.log('\n📝 Test Case 3: Missing required fields');
        try {
            const missingFieldsData = {
                name: 'Incomplete User',
                email: 'incomplete@example.com'
                // Missing subject and message
            };
            const incompleteUser = new UserModel(missingFieldsData);
            await incompleteUser.save();
        } catch (error) {
            console.log('✅ Missing fields test passed!');
            console.log('Error message:', error.message);
        }

        // Fetch and display all documents
        console.log('\n📋 All documents in the database:');
        const allDocuments = await UserModel.find({});
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
testFormSubmission(); 