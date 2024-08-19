const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    const articles = [{

        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {

        title: 'Test Article-2',
        createdAt: new Date(),
        description: 'Test description-2'
    } 
    ]
    res.render('articles/index', {articles: articles});
})

app.use('/articles', articleRouter)


app.listen(5000 , (req,res)=>{
    console.log("Listening at port 5000");
    
})
