require("dotenv").config()
const Express = require("express")
const axios = require('axios'); 
const ejsLayouts = require("express-ejs-layouts")
const helmet = require("helmet")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("./config/ppConfig")
const db = require("./models")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const isLoggedIn = require("./middleware/isLoggedIn")
const rowdy = require('rowdy-logger')
const moment = require('moment')
const methodOverride = require('method-override');
const app = Express()

rowdy.begin(app)

app.use(methodOverride('_method'));
app.use(Express.urlencoded({ extended: false}))
app.use(Express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(require("morgan")("dev"))
app.use(helmet())

const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync()

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req, res, next) {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() 
})


app.get("/", function(req, res) {
    res.render("index")
})

//app.get("/profile", isLoggedIn, function(req, res) {
//    res.render("profile")
// })


// GET / - main index of site
//app.get('/films', function(req, res) {
//    var filmsUrl = 'https://ghibliapi.herokuapp.com/films';
    // Use request to call the API
//    axios.get(filmsUrl).then( function(apiResponse) {
 //     var films = apiResponse.data;
 //     res.render('films/index', { films: films.slice(0, 30) });
 //   })
//  });

// GET / - main index of site
// app.get('/people', function(req, res) {
//       var peopleUrl = 'https://ghibliapi.herokuapp.com/people';
    // Use request to call the API
//    axios.get(peopleUrl).then( function(apiResponse) {
//      var people = apiResponse.data;
//      console.log(apiResponse.data)
//      res.render('people/index', { people: people.slice(0, 60) });
//    })
//  });

// GET / - main index of site
//app.get('/vehicles', function(req, res) {
//  var vehiclesUrl = 'https://ghibliapi.herokuapp.com/vehicles';
  // Use request to call the API
//  axios.get(vehiclesUrl).then( function(apiResponse) {
//    var vehicles = apiResponse.data;
//    console.log(apiResponse.data)
//    res.render('vehicles/index', { vehicles: vehicles.slice(0,10) });
//  })
//});

// GET / - main index of site
//app.get('/locations', function(req, res) {
//  var locationsUrl = 'https://ghibliapi.herokuapp.com/locations';
  // Use request to call the API
//  axios.get(locationsUrl).then( function(apiResponse) {
 //   var locations = apiResponse.data;
 //   res.render('locations/index', { locations: locations.slice(0, 30) });
 // })
//});

app.use("/auth", require("./controllers/auth"))
app.use('/films', require('./controllers/films'));
app.use('/people', require('./controllers/people'));
app.use('/profile', require('./controllers/profile'));
app.use('/vehicles', require('./controllers/vehicles'));
app.use('/locations', require('./controllers/locations'));
var server = app.listen(process.env.PORT || 3000)
module.exports = server;