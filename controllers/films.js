var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/films/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.films.findAll().then(function(poke) {
    res.render("films/index", {poke:poke})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/films/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.films.findOrCreate({
    where: {
      title: req.body.title
    }
  }).then(([films, created]) => {
    res.redirect('/films')
  })
});


router.get('/films/:id', function(req, res) {
  db.films.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(films) {
    axios.get('https://ghibliapi.herokuapp.com/'+films.title.toLowerCase())
    .then(function(response) {
      res.render('films/show', {response})
    })
  })
})




module.exports = router;