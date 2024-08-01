const User = require("../models/user");

async function handleGetAllUseers(req,res){
    allDbUsers = await User.find({});
    // res.setHeader("myName", "Amul");
    console.log(req.headers);
    return res.json(allDbUsers);
}

module.exports={
    handleGetAllUsers
}