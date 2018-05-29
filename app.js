var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var passport = require('passport')
var localStrategy = require('passport-local')
var passportLocalMongoose = require('passport-local-mongoose')

var User = require('./models/user.js')

var app = express()

app.use(require('express-session')({
  secret: "why me",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

mongoose.connect('mongodb://localhost/auth-demo')
app.set('view engine', 'ejs')

app.get('/', function (req,res) {
  res.render('home')
})

app.get('/secret', function (req,res) {
  res.render('secret')
})

app.listen(3000, function () {
  console.log('server has been served')
})
