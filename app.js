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
app.use(bodyParser.urlencoded({extended: true}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

mongoose.connect('mongodb://localhost/auth-demo')
app.set('view engine', 'ejs')

app.get('/', function (req,res) {
  res.render('home')
})

app.get('/register', function (req,res) {
  res.render('register')
})

app.post('/register', function (req,res) {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err,user){
    if (err) {
      return res.redirect('/register')
    }
    passport.authenticate('local')(req,res, function () {
      res.redirect('secret')
    })
  })
})

app.get('/secret', function (req,res) {
  res.render('secret')
})

app.listen(3000, function () {
  console.log('server has been served')
})
