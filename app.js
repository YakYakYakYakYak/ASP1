const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const portNumber = process.env.PORT || 3000;

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//parse JSON-bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerHelper('toUpperCase', function(str) {
    str = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return str;
});

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes//auth'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port: " + portNumber);
})

module.exports = hbs;