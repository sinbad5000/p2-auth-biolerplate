module.exports = function(req, res, next) {
    if (!req.user) {
        req.flash("error", "must be logged in")
        res.redirect("/auth/login")
    } else {
        next()
    }
}