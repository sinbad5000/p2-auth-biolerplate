var express = require('express');
var router = express.Router();
var db = require('../models');
const isLoggedIn = require("../middleware/isLoggedIn")


// GET 



router.get('/', isLoggedIn, function (req, res) {
  // TODO: Get all records from the DB and render to view

  db.film.findAll().then(function (films) {
    db.person.findAll().then(function (people) {
      db.vehicle.findAll().then(function (vehicles) {
        db.location.findAll().then(function (locations) {

          res.render("profile/index", { people, films, vehicles, locations })
        })
      })
    })
  })
});

  


  // DELETE


  
  router.delete('/films/:title', (req, res) => {
      db.film.destroy({
        where: {
          title: req.params.title
        }
      }).then(res.redirect("/profile"))
    });

    router.delete('/people/:name', (req, res) => {
      db.person.destroy({
        where: {
          title: req.params.name
        }
      }).then(res.redirect("/profile"))
    });


    router.delete('vehicles/:name', (req, res) => {
      db.vehicle.destroy({
        where: {
          name: req.params.name
        }
      }).then(res.redirect("/profile"))
    });


    router.delete('locations/:name', (req, res) => {
      db.location.destroy({
        where: {
          name: req.params.name
        }
      }).then(res.redirect("/profile"))
    });






  // POST 

  
  router.post('/films', isLoggedIn, function(req, res) {
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
  
  router.post('/people', isLoggedIn, function(req, res) {
    // TODO: Get form data and add a new record to DB
    
    db.person.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
          name: req.body.name
      }
    }).then(([person, created]) => {
      res.redirect('/profile')
    })
  });
  
  router.post('/vehicles', isLoggedIn, function(req, res) {
    // TODO: Get form data and add a new record to DB
    
    db.vehicle.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    }).then(([vehicle, created]) => {
      res.redirect('/profile')
    })
  });

  router.post('/locations', isLoggedIn, function(req, res) {
    // TODO: Get form data and add a new record to DB
    
    db.location.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    }).then(([location, created]) => {
      res.redirect('/profile')
    })
  });



//  router.get('/:id', function(req, res) {
//  //  db.films.findOne({
//    //  where: {
//      //  id: req.params.id
 //    // }
 //  // }).then(function(films) {
 //     axios.get('https://ghibliapi.herokuapp.com/films/'+req.params.id)
 //     .then(function(response) {
  //      res.render('profile/show', {response})
//  //    })
//    })
//  })




module.exports = router;