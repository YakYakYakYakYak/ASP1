const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get("/", authController.isLoggedIn, (req,res)=> {
    res.render("index", {
        user:req.user
    })
});

router.get("/register", (req,res)=> {
    res.render("register")
});

router.get("/login", (req,res)=> {
    res.render("login")
});


//check token, render token else redirect to login.
router.get('/profile', authController.isLoggedIn, (req, res) => {

    if(req.user) {
        res.render('profile', {
            user:req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/browse', (req, res) => {

    db.query("SELECT * FROM users", (error, result) => {
        if(error) {
            res.redirect('/');
        }
        
        res.render('browse', {
            user:result
        });
    })            
})

router.post('/profile', authController.isLoggedIn, (req, res) => {
    const message = req.body.message;
    const id = req.user.id;
    console.log('testing!');
    console.log(message);
    console.log(id);
    db.query("UPDATE users SET message = ? WHERE id = ?", [message, id], (error, result) => {
        if(error) {
            console.log(error)
        } else {
            console.log(result);
                return res.redirect('profile');
        }
    })
});

module.exports = router;