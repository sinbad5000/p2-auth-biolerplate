require("dotenv").config()
const Express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const helmet = require("helmet")
const session = require("express-session")
const flash = require("flash")



const app = Express()
app.use(Express.urlencoded({ extended: false}))
app.use(Express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(require("morgan")("dev"))
app.use(helmet())


app.get("/", (req, res) => {
    res.render("index")
})

app.use("/auth", require("./controllers/auth"))


app.listen(process.env.PORT || 3000)