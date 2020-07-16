var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// const { receiveMessageOnPort } = require('worker_threads');

// GET /pokemon - return a page with favorited Pokemon
//router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
 // db.films.findAll().then(function(films) {
 //   res.render("films/index", {films:films})
//  })
// });

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.film.findOrCreate({
    where: {
      title: req.body.title
    }
  }).then(([films, created]) => {
    res.redirect('/films')
  })
});

router.get('/', function(req, res) {
  var filmsUrl = 'https://ghibliapi.herokuapp.com/films';
  // Use request to call the API
  axios.get(filmsUrl).then( function(apiResponse) {
    var films = apiResponse.data;
    res.render('films/index', { films: films.slice(0, 30) });
  })
});

router.get('/:id', function(req, res) {
//  db.films.findOne({
  //  where: {
    //  id: req.params.id
   // }
 // }).then(function(films) {
    axios.get('https://ghibliapi.herokuapp.com/films/'+req.params.id)
    .then(function(response) {
      res.render('films/show', {response})
//    })
  })
})




module.exports = router;