const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  actor_ID: {
    type: Number,
    unique: true,
    required: true,
  },
});

const actorsCollection = mongoose.model("actors", actorsSchema);

const Actors = {
  createActor: function (newActor) {
    return actorsCollection
      .create(newActor)
      .then((createdActor) => {
        return createdActor;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  createMany: function (actors) {
    return actorsCollection
      .insertMany(actors)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getActorByName: function (name) {
    return actorsCollection
      .find({ firstName: name })
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
  Actors,
};
