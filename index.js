const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = new express();
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/users')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session')
 


const dbURL = 'mongodb://localhost:27017/EventLoggerDatabase'


mongoose.set('strictQuery', true);
mongoose.connect(dbURL, { family : 4}, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));


//check for DB Successful Connection
// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', dbURL)
// })
// db.on('error', err => {
//   console.error('connection error:', err)
// })

// MiddleWARES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

//routes
app.use('/logs', logRoutes);
app.use('/users', userRoutes )


// Routes
app.get('/', (request, response) => {
    response.render("index")
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

  // express validator

// app.use(expressValidator({
//     errorFormatter : function(param, msg, value) {
//         var namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;

//         while(namespace.length) {
//             formParam += '[' + namespace.shift() + ']'
//         }
//         return{
//             param : formParam,
//             msg : msg,
//             value : value
//         };
//     }
// }));

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


// Adding Data to Database
// app.get('/add-log', (request, response) => {
//     const log = new Log({
//         title: 'Cloud Servives',
//         snippet: 'Virtual Machines and Containers',
//         body: 'Making Changes the platform',
//         author: 'muhsin',
//         authorProfession: 'AWS Cloud Solutions Architect'
//     })
//     log.save()
//         .then((result) => {
//             response.send(result)
//         })
//         .catch((error) => {
//             console.log(error)
//         });
// })


const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is Listening on Port ${serverPort}........`)
} )