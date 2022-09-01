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

      const spotifyID = async () =>
        spotifyApi.getMe().then(
          function (data) {
            let userID = data.body.id;
            return userID;
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );

        (async () => {
            const userID = await spotifyID();
            spotifyApi.getMe().getMySavedTracks().then(
              function (data) {
                let likedSongs = [];
                data.body.items.forEach((song) => {
                    likedSongs.push(song);
                });
                res.json(likedSongs);
              },
              function (err) {
                console.log("Something went wrong!", err);
              }
            );
          })();
  } 
  catch(error ) {
      next(error);
  }
});

module.exports = router;