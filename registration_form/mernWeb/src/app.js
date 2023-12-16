
const express = require('express');
const path = require('path');
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./registers");

const port = process.env.PORT || 4000;


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(path.join(__dirname,"../templates/partials"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set('views', templates_path);
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);


app.get('/', (req, res) => {
    res.render("index")
});
app.get('/register', (req, res) => {
    res.render("register")
});

// create a new user in our database
app.post("/register", async (req, res) => {
    try {
        const password = req.body.pswd;
        const cpassword = req.body.cPswd;
        if (password === cpassword) {
            const registerEmployee = new Register({
                email: req.body.email,
                gender: req.body.gender,
                password: password,
                confirmPassword: cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        } else {
            res.send("incorrect confirm password")
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
});