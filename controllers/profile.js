var express = require('express');
var router = express.Router();
var db = require('../models');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
   
    db.film.findAll().then(function(films) {
     
     res.render("profile/index", {films:films})
    })
  });
  
  router.delete('/:title', (req, res) => {
      db.film.destroy({
        where: {
          title: req.params.title
        }
      }).then(res.redirect("/profile"))
    });
  // POST /pokemon - receive the name of a pokemon and add it to the database
  router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    db.film.findOrCreate({
      where: {
        title: req.body.title
      },
      defaults: {
          title: req.body.title
      }
    }).then(([film, created]) => {
      res.redirect('/profile')
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
        res.render('profile/show', {response})
  //    })
    })
  })




module.exports = router;