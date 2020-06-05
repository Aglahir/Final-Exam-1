const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const errorHandling = require("./middleware/errorHandler");

const { Movies } = require("./models/movie-model");
const { Actors } = require("./models/actor-model");

const app = express();

/* 
    Your code goes here 
*/

app.post("/api/addActors", jsonParser, (req, res, next) => {
  Actors.createMany(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(400).end();
    });
});

app.post("/api/addMovies", jsonParser, (req, res, next) => {
  Movies.createMany(req.body)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(400).end();
    });
});

app.patch("/api/delete-movie-actor/:movie_ID", jsonParser, (req, res, next) => {
  let movie_ID = req.params.movie_ID;
  let { id, firstName, lastName } = req.body;

  if (!id) {
    res.errorMessage = "Id is missing in the body of the request";
    res.errorStatus = "MISSING_BODY";
    next();
  } else if (movie_ID != id) {
    res.errorMessage = "id and movie_ID do not match";
    res.errorStatus = "DO_NOT_MATCH";
    next();
  } else if (!firstName || !lastName) {
    res.errorMessage =
      "You need to send both firstName and lastName of the actor to remove from the movie list";
    res.errorStatus = "MISSING_FIRST_OR_LAST";
    next();
  } else {
    Movies.patchDeleteAuthor(movie_ID, firstName, lastName)
      .then((result1) => {
        if (result1) {
          return result1;
        } else {
          console.log("Something happened");
        }
      })
      .then((result2) => {
        if (result2) {
          Movies.getMovieByID(movie_ID)
            .then((response) => {
              if (result2.nModified === 0) {
                res.errorMessage = "The actor or movie do not exist";
                res.errorStatus = "DB_NOT_EXISTS";
                next();
              } else {
                return res.status(201).json(response);
              }
            })
            .catch((err) => {
              res.errorMessage = err.message;
              res.errorStatus = "DB_NOT_EXISTS";
              next();
            });
        } else {
          res.errorMessage = "The actor or movie do not exist";
          res.errorStatus = "DB_NOT_EXISTS";
          next();
        }
      })
      .catch((err) => {
        res.errorMessage = err;
        res.errorStatus = "DB_NOT_EXISTS";
        next();
      });
  }
});

// ERROR HANDLING MIDDLEWARE AFTER ALL
app.use(errorHandling);

app.listen(PORT, () => {
  console.log("This server is running on port " + PORT);
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
