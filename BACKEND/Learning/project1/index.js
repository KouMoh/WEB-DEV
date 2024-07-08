const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const { log } = require('console');
const app = express();

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

app.get("/api/users", (req, res) =>{
    return res.json(users);
});

app.get("/users", (req, res) =>{
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;

    res.send(html);
});

app.post("/api/users", (req,res)=>{

    const body = req.body;
    console.log("Body: ",body);
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) =>{
        return res.json({status: "success", id: users.length});
    });
});



app
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
.delete((req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.json({ status: "error", message: "Failed to write to file" });
            }
            return res.json({ status: "success", user: deletedUser[0] });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

});

app.listen(port, () => {console.log(`Server started at port ${port}`)});
