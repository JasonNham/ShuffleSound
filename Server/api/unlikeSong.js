const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");
router.get("/:authToken/:songURI", async (req, res, next) => {
  const token = req.params.authToken;
  var songURI = req.params.songURI;

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);
    songURI = songURI.substring(14);
    spotifyApi
      .removeFromMySavedTracks([songURI])
      .then(
        function (data) {},
        function (err) {
          console.log("Something went wrong!", err);
        }
      )
      .then(() => {
        res.json({
          message: "Successfully removed song from your library",
        });
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
