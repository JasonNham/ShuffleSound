const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
  unique: true,
};

const userEntrySchema = new Schema(
  {
    spotifyID: requiredString,
    display_name: requiredString,
    target_acousticness: { type: Number, min: 0, max: 1 },
    target_danceability: { type: Number, min: 0, max: 1 },
    target_energy: { type: Number, min: 0, max: 1 },
    target_instrumentalness: { type: Number, min: 0, max: 1 },
    target_key: {
      type: Number,
      min: 0,
      max: 11,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    target_liveness: { type: Number, min: 0, max: 1 },
    target_speechiness: { type: Number, min: 0, max: 1 },
    target_tempo: { type: Number, min: 0, max: 250 },
    target_valence: { type: Number, min: 0, max: 1 },
    used_songs: [],
    preferred_genres: [],
  },
  {
    timestamps: true,
  }
);

const userEntry = mongoose.model("user", userEntrySchema);

module.exports = userEntry;
