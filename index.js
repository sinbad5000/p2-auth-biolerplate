require("dotenv").config()
const Express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const helmet = require("helmet")
const session = require("express-session")
const flash = require("flash")
const passport = require("./config/ppConfig")
const db = require("./models")
const SequelizeStore = require("connect-session-sequelize")(session.Store)



const app = Express()
app.use(Express.urlencoded({ extended: false}))
app.use(Express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(require("morgan")("dev"))
app.use(helmet())

const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 *60 *30
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
    res.locals.alert = req.flash()
    res.locals.currentUser = req.user
    next() 
})


app.get("/", (req, res) => {
    res.render("index")
})

app.use("/auth", require("./controllers/auth"))


app.listen(process.env.PORT || 3000)