const express = require('express')
const app = express();
const path = require('path');

app.set('view engine' ,'ejs')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const messages = [
        {
          text: "Hi there!",
          user: "Amando",
          added: new Date()
        },
        {
          text: "Hello World!",
          user: "Charles",
          added: new Date()
        },{
            text:"Architect of own Destruction",
            user:"Amul",
            added: new Date()
        }
      ];
      res.render("index", { title: "Mini Messageboard", messages: messages })
})

app.listen(8080,(req,res)=>{
    console.log("Server running at port 8080");
    
})