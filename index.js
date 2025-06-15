import express from 'express';
import routes from './routes/routes.js';
import connectDB from './db/connectDB.js';
import bodyParser from 'body-parser';
import path from 'path';
const app=express();

// Use Render's PORT or default to 8080
const port=process.env.PORT || 8080;

// MongoDB Atlas connection string
// const DATABASEURL=process.env.DATABASE_URL||'mongodb://127.0.0.1:27017/portfolio';  // Previous local MongoDB connection
const DATABASEURL=process.env.MONGODB_URI || 'mongodb+srv://sakshichakre0421:rchAp3KidMpKB0VR@cluster1.m3si1wf.mongodb.net/portfolio';

//database configuration
connectDB(DATABASEURL);

// parse application
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // Add JSON parsing

//setup for static files
app.use(express.static(path.join(process.cwd(),'public')));

//ejs setup
app.set('view engine', 'ejs');
app.set('views','./views')

//create routes
app.use('/',routes);

// Add a health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//project setup
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});