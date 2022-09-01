const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");

router.get("/:authToken", async (req, res, next) => {
  const token = req.params.authToken;

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);

    spotifyApi.getMe().then(
      function (data) {
        res.json(data.body);
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
