const express = require('express');
const fs = require('fs');

const userRouter = require('./routes/user')

const{conectMongoDb, connectMongoDb} = require('./connection')

const mongoose = require("mongoose");
const { log, timeStamp } = require('console');
const app = express();

// mongoose
//   .connect('mongodb://127.0.0.1:27017/ek-mai-aur-ek-tu-hai')
//   .then(() => console.log('MongoDB connected!'))
//   .catch((err) => console.error("MongoDB connection error:", err));

connectMongoDb("mongodb://127.0.0.1:27017/ek-mai-aur-ek-tu-hai");


const port = 8000;

app.use(express.urlencoded({extended: false }));

app.use((req,res,next) =>{
    console.log("Hello from middleware 1");
    fs.appendFile('log.txt', `${Date.now()} : ${req.method}: ${req.path}`, (err,data) =>{
        next();
    })
    // req.myUserName = "Amul"
    
})

app.use((req,res,next) =>{
    console.log("Hello from middleware 2", req.myUserName );
    next();
    
});


app.use("/user", userRouter)
app.listen(port, () => {console.log(`Server started at port ${port}`)});
