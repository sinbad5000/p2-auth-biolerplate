var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon


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

router.get('/', function(req, res) {
  var peopleUrl = 'https://ghibliapi.herokuapp.com/people';
  // Use request to call the API
  axios.get(peopleUrl).then( function(apiResponse) {
    var people = apiResponse.data;
    console.log(apiResponse.data)
    res.render('people/index', { people: people.slice(0, 60) });
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