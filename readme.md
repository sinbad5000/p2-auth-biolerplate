Project 2

This app I built calls the studio ghibli API and lists every movie, person, location, and vehicle! you can even add your favorite movie to your profile for quicker access 



MVP goals

I made four models
You can favorite a movie to profile 
You can delete a movie from profile
Each item (movie, person, etc.) has a unique page when clicked on from the show page.

Stretch goals

Wanted movie poster pictures to show on the "show" page 
Organize profile page with categories
Be able to add/delete any of the model pages to/from profile 
Use a 2nd API for movie posters

Routes

Method	Path	    Purpose
GET	/	            home page that lists all pages and an intro
GET	/profile	    gets profile page
POST /profile   	deletes from profile
GET	/films      	lists all the films
POST /films         send the film to profile
GET	/people     	lists all the people
GET /locations	    lists all the locations
GET	/vehicles	    lists all the vehicles
GET /auth/login     shows login page
POST /auth/login    posts info and logs in
GET /auth/register  show register page
POST /auth/register posts register info to user and logs in

Models

film
Attributes: title

location
Attributes: name

person
Attributes: name

vehicle
Attributes: name

user
Attributes: name, email, password

Images from: https://studioghiblimovies.com/
API used: https://ghibliapi.herokuapp.com/