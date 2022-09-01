const { Router } = require("express");
const router = Router();

const userEntry = require("../Models/userEntry");

var SpotifyWebApi = require("spotify-web-api-node");

router.get("/:authToken/:genres", async (req, res, next) => {
  const token = req.params.authToken;
  const genres = req.params.genres;
  const genreSplit = genres.split(",");
  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);

    const spotifyID = async () =>
      spotifyApi.getMe().then(
        function (data) {
          return [data.body.id, data.body.display_name];
        },
        function (err) {
          res.send(err);
        }
      );

    (async () => {
      const values = await spotifyID();
      const userID = values[0];
      const display_name = values[1];
      const userData = new userEntry({
        spotifyID: userID,
        display_name: display_name,
        target_acousticness: 0.5,
        target_danceability: 0.5,
        target_energy: 0.5,
        target_instrumentalness: 0.5,
        target_key: 5,
        target_liveness: 0.5,
        target_speechiness: 0.5,
        target_tempo: 116,
        target_valence: 0.5,
        used_songs: [],
        preferred_genres: genreSplit,
      });
      userData
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
