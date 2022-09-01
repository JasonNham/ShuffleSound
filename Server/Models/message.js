const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
  unique: true,
};

//MESSAGE

const messageSchema = new Schema(
    {
      spotifyID: requiredString,
      conversationID: {type: String},
      displayName: {type: String},
      songURI: {type: String},
      message: {type: String}
    },
    {
      timestamps: true,
    }
);

const message = mongoose.model("message", messageSchema);;

module.exports = message;