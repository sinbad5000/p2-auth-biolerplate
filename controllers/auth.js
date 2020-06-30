const express = require("express")
const router = express.Router()
const db = require("../models")

// import middleware
const flash = require("flash");
const { response } = require("express");
const passport = require("../config/ppConfig");

router.get("/register", function(req, res) {
    res.render("auth/register")
})
router.post("/register", function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        if (created) {
            console.log("user made")
            res.redirect("/")
        } else {
            console.log("email exists")
            req.flash("error", "email already exists, try again")
            res.redirect("/auth/register")
        }
    }).catch(function(err){
        console.log(`err at ${err}`)
        req.flash("error", err.message)
        res.redirect("/auth/register")
    })
})



router.get("/login", function(req, res) {
    res.render("auth/login")
})
router.post("/login", function(req, res) {
    passport.authenticate("local", function(error, user, info) {
        if (!user) {
            req.flash("error", "invalid username or password")
            req.session.save(function() {
                return res.redirect("auth/login")
            })
        }
        if (error) {
            return next(error)
        }
        req.login(function(user, error) {
            if (error) next(error)
            req.flash("success", "you logged in")
            req.session.save(function() {
                return res.redirect("/")
            })
        })
    })
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/auth/login",
    successFlash: "welcome",
    failureFlash: "invalid username or password"
}))




module.exports = router