const express = require('express');
const env = require('dotenv').config();
const app = express();
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const users = [];

initializePassport(passport, email => {
    return users.find(user => user.email === email)
});
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'test'})
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: '/login',
    failureFlash: true,
}))
app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashPassword)
        users.push({
            id: uuid(),
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        res.redirect('/login')
    }
    catch(err) {
        res.redirect('/register')
    }
    console.log(users)
});


app.listen(3000);