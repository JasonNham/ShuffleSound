const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");
router.get("/:authToken/:playlistID/:songURI", async (req, res, next) => {
  const token = req.params.authToken;
  const playlistID = req.params.playlistID;
  const songURI = req.params.songURI;

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);

    spotifyApi.addTracksToPlaylist(playlistID, [songURI]).then(
      function (data) {
        console.log("added");
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
