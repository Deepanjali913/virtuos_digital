import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true 
}))

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true , limit: " 16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


 //routes import
// import categoriesRouter from './routes/categories.routes.js'
// import businessRouter from './routes/business.routes.js';
import studentsRouter from './routes/students.routes.js';


// //routes declaration
//  app.use("/api/v1/categories" , categoriesRouter)
//  app.use("/api/v1/business" , businessRouter)
app.use("/api/v1/students" , studentsRouter)

export {app}