const { Router } = require("express");
const router = Router();

const userEntry = require("../Models/userEntry");

var SpotifyWebApi = require("spotify-web-api-node");

router.get("/:authToken/:uri", async (req, res, next) => {
  const token = req.params.authToken;
  const uri = req.params.uri;
  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);

    const songURI = uri.substring(14);
    spotifyApi.containsMySavedTracks([songURI]).then(
      function (data) {
        // An array is returned, where the first element corresponds to the first track ID in the query
        var trackIsInYourMusic = data.body[0];
        if (trackIsInYourMusic) {
          res.json({
            liked: true,
          });
        } else {
          res.json({
            liked: false,
          });
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
