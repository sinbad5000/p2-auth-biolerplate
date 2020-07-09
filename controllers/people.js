var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.people.findAll().then(function(poke) {
    res.render("people/index", {poke:poke})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.people.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([people, created]) => {
    res.redirect('/people')
  })
});


router.get('/:id', function(req, res) {
//  db.people.findOne({
//    where: {
//      id: req.params.id
//    }
 // }).then(function(people) {
    axios.get('https://ghibliapi.herokuapp.com/people/'+req.params.id)
    .then(function(response) {
      res.render('people/show', {response})
 //   })
  })
})




module.exports = router;