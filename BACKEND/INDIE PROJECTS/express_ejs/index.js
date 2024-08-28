const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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
    },
    {
        text: "Architect of own Destruction",
        user: "Amul",
        added: new Date()
    }
];

app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get('/new', (req, res) => {
    res.render("form");
});

app.post("/new", (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;

    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});


app.get('/message/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    if (messageId >= 0 && messageId < messages.length) {
        const message = messages[messageId];
        res.render('message', { title: "Message Details", message: message });
    } else {
        res.status(404).send('Message not found');
    }
});

app.listen(8080, () => {
    console.log("Server running at port 8080");
});
