import express from 'express';
import routes from './routes/routes.js';
import connectDB from './db/connectDB.js';
import bodyParser from 'body-parser';
import path from 'path';
const app=express();
const port=process.env.PORT || 8080;
const DATABASEURL=process.env.DATABASE_URL||'mongodb://127.0.0.1:27017/portfolio';
//database configuration
connectDB(DATABASEURL);

// parse application
app.use(bodyParser.urlencoded({extended:false}))

//setup for static files
app.use(express.static(path.join(process.cwd(),'public')));

//ejs setup
app.set('view engine', 'ejs');
app.set('views','./views')

//create routes
app.use('/',routes);
// app.get('/',(req,res)=>{
//     res.send ('Welcome to my home page');
// })


//project setup
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:8080`);
})