var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/people/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.people.findAll().then(function(poke) {
    res.render("people/index", {poke:poke})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/people/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.people.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([people, created]) => {
    res.redirect('/people')
  })
});


router.get('/people/:id', function(req, res) {
  db.people.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(people) {
    axios.get('https://ghibliapi.herokuapp.com/'+people.name.toLowerCase())
    .then(function(response) {
      res.render('people/show', {response})
    })
  })
})




module.exports = router;