const express =  require("express");
const { handleGetAllUsers } = require("../controllers/user");

const router = express.Router();

router.get("/", handleGetAllUsers);


router.post("/", async (req,res)=>{

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



router
.route("/:id")
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

module.exports = router;
