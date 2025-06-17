import express from 'express';
import routes from './routes/routes.js';
import connectDB from './db/connectDB.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// const DATABASEURL = process.env.MONGODB_URI;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use Render's PORT or default to 8080 
const port = process.env.PORT //"|| 8080 ;"

// MongoDB Atlas connection string
// const DATABASEURL=process.env.DATABASE_URL||'mongodb://127.0.0.1:27017/portfolio';  // Previous local MongoDB connection
const DATABASEURL = process.env.MONGODB_URI || 'mongodb+srv://sakshichakre0421:rchAp3KidMpKB0VR@cluster1.m3si1wf.mongodb.net/portfolio?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup for static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', routes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Database connection and server start
const startServer = async () => {
    try {
        await connectDB(DATABASEURL);
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
            // console.log("server running");
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();