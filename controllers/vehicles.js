var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.vehicles.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([people, created]) => {
    res.redirect('/vehicles')
  })
});

router.get('/', function(req, res) {
  var vehiclesUrl = 'https://ghibliapi.herokuapp.com/vehicles';
  // Use request to call the API
  axios.get(vehiclesUrl).then( function(apiResponse) {
    var vehicles = apiResponse.data;
    console.log(apiResponse.data)
    res.render('vehicles/index', { vehicles: vehicles.slice(0,10) });
  })
});

router.get('/:id', function(req, res) {
//  db.people.findOne({
//    where: {
//      id: req.params.id
//    }
 // }).then(function(people) {
    axios.get('https://ghibliapi.herokuapp.com/vehicles/'+req.params.id)
    .then(function(response) {
      res.render('vehicles/show', {response})
 //   })
  })
})




module.exports = router;