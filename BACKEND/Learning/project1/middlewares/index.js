const fs = require("fs")

function longReqRes(filename){
    return (req,res,next) =>{
        console.log("Hello from middleware 1");
        fs.appendFile('log.txt', `${Date.now()} : ${req.method}: ${req.path}`, (err,data) =>{
            next();
        })
        // req.myUserName = "Amul"
        
    }
}

module.exports = {
    longReqRes
}