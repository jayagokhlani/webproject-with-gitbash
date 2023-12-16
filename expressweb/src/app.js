const express = require ('express');
const app = express();
const path= require('path');
const port = process.env.PORT ||3000;
const hbs=require('hbs')

//public static path
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.set('views',templates_path)
app.set('view engine','hbs');
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

//route
app.get("/", (req,res)=>{
    res.render('index.hbs')
    
})

app.get("/about", (req,res)=>{
    res.render('about.hbs')
 })

app.get("/weather", (req,res)=>{
    res.render('weather.hbs')
})

app.get("*", (req,res)=>{
    res.render('404error',{
        errorMsg: 'oops! page not found'
    })
    
})

//listening
app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
})