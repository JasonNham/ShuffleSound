const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");

router.get("/:authToken/:search", async (req, res, next) => {
  const token = req.params.authToken;
  var search = req.params.search;

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);

    var search = decodeURI(search);
    spotifyApi.searchTracks(search).then(
      function (data) {
        res.json(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
