const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  movie_ID: {
    type: Number,
    unique: true,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actors",
      required: true,
    },
  ],
});

const moviesCollection = mongoose.model("movies", moviesSchema);

const Movies = {
  createMovie: function (newMovie) {
    return moviesCollection
      .create(newMovie)
      .then((createdMovie) => {
        return createdMovie;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  patchDeleteAuthor: function (movie_ID, actor_firstName, actor_lastName) {
    return moviesCollection
      .findOne({ movie_ID: movie_ID })
      .populate("actors")
      .then((movie) => {
        let changes = false;

        let newArray = [];

        let newActors = movie.actors.filter((actor, index) => {
          console.log(actor.firstName);
          console.log(actor_firstName);
          console.log(actor.lastName);
          console.log(actor_lastName);

          if (
            actor.firstName == actor_firstName &&
            actor.lastName == actor_lastName
          ) {
            changes = true;
            console.log("inserting");

            newArray.push(actor._id);
            return actor._id;
          }
        });

        console.log(newArray);

        if (changes) {
          return moviesCollection
            .updateOne({ movie_ID: movie_ID }, { actors: newActors })
            .then((response) => {
              return response;
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("The actor or movie do not exist");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  getMovieByID: function (movie_ID) {
    return moviesCollection
      .findOne({ movie_ID: movie_ID })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  createMany: function (movies) {
    return moviesCollection
      .insertMany(movies)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  /*
        Your code goes here
    */
};

module.exports = {
  Movies,
};
