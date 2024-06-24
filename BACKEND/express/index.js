import express from "express";

const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    const today = new Date();
    const day =today.getDay();
    // console.log(day);

    let type = "a weekday";
    let advice = "it's time to workhard";

    if(day ==0 || day ==6){
        type = "the weekend";
        adv = "it's time to work hard!"
    }
res.render("index.ejs",{
    dayType: "a weekday",
    advice: "it's time to work hard"})
});



app.listen(port, () =>{
    console.log(`Server is listening on port ${port}.`);
})