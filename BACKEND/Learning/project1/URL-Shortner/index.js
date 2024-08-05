const express = require('express')
const {connectToMongoDB} = require("./connect")
const urlRoute = require("./routes/url")

const app =  express();
const PORT = 8001;
app.use(express.json())
app.use("/url", urlRoute)
connectToMongoDB('mongodb://localhost:27017/short-url').then ( () =>
    console.log("connected")
)
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))