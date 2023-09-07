const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = new express();
const logRoutes = require('./routes/commentRoutes');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const coreRoute = require('./routes/core');
const booksRoute = require('./routes/books');
const commentRoute = require('./routes/commentRoutes')
const tagsRoute = require('./routes/tags')
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');
const Database = require('./Database');
require('dotenv').config()
Database()  


// Passport Config
require('./config/passport')(passport);


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });





// MiddleWARES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false}));

//routes
app.use('/books', booksRoute);
app.use('/comments', commentRoute);
app.use('/users', usersRoute);
app.use('/tags', tagsRoute);



// Routes
app.get('/', (request, response) => {
    response.render("landingPage")
})

app.get('/booksDashboard', (request, response) => {
    response.render('booksDashboard')
})


//middlewares
// Flash Messahes
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))



app.use(expressValidator);

app.get('/about', (request, response) => {
    response.render("about")
})

app.get('/services', (request, response) => {
    response.render("services")
})

app.get('/contact', (request, response) => {
    response.render("contact")
})

app.get('/portfolio', (request, response) => {
    response.render("portfolio")
})

app.get('/listingPage', (request, response) => {
    response.render("listingPage")
})

app.get('/detailPage', (request, response) => {
    response.render("detailPage")
})

app.get('/login', (request, response) => {
    response.render("login")
})

app.get('/register', (request, response) => {
    response.render("register")
})



const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is Listening on Port ${serverPort}........`)
} )