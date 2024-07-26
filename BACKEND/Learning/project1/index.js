const express = require('express');
const fs = require('fs');


const mongoose = require("mongoose");
const { log, timeStamp } = require('console');
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/ek-mai-aur-ek-tu-hai')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    JobTitle: {
        type: String
    },

    gender:{
        type: String
    },
},{timestamps: true});

const User = mongoose.model("user", userSchema);

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

app.get("/api/users", async (req, res) =>{
    allDbUsers = await User.find({});
    // res.setHeader("myName", "Amul");
    console.log(req.headers);
    return res.json(allDbUsers);
});

app.get("/users", async (req, res) =>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;

    res.send(html);
});

app.post("/api/users", async (req,res)=>{

    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender||
        !body.job_title
    ) {
        return res.status(400).json({msg : "All fields are req..."});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });
    console.log(result);
    return res.status(201).json({ msg: ' success'});
});



app
.route("/api/users/:id")
.get( async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
})
.post((req,res)=>{

    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.json({ status: "error", message: "Failed to write to file" });
            }
            return res.json({ status: "success", user: users[index] });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
}) 
.delete( async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"})

});

app.listen(port, () => {console.log(`Server started at port ${port}`)});
