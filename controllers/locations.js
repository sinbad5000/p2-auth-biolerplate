var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');




// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.locations.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([people, created]) => {
    res.redirect('/locations')
  })
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  var locationsUrl = 'https://ghibliapi.herokuapp.com/locations';
  // Use request to call the API
  axios.get(locationsUrl).then( function(apiResponse) {
    var locations = apiResponse.data;
    res.render('locations/index', { locations: locations.slice(0, 30) });
  })
});

router.get('/:id', function(req, res) {
//  db.people.findOne({
//    where: {
//      id: req.params.id
//    }
 // }).then(function(people) {
    axios.get('https://ghibliapi.herokuapp.com/locations/'+req.params.id)
    .then(function(response) {
      res.render('locations/show', {response})
 //   })
  })
})




module.exports = router;