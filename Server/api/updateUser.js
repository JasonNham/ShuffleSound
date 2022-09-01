const { Router } = require("express");

const router = Router();

const userEntry = require("../Models/userEntry");

var SpotifyWebApi = require("spotify-web-api-node");

router.get("/:authToken/:songURIs", async (req, res, next) => {
  const token = req.params.authToken;
  const songs = req.params.songURIs;

  let new_acousticness = 0;
  let new_danceability = 0;
  let new_energy = 0;
  let new_instrumentalness = 0;
  let new_key = 0;
  let new_liveness = 0;
  let new_speechiness = 0;
  let new_tempo = 0;
  let new_valence = 0;

  const songURIs = songs.split(",");

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

      var userData = userEntry
        .find({ spotifyID: userID })
        .exec(function (err, currentUser) {
          if (err) {
            console.log(err);
          } else {
            let target_acousticness = currentUser[0].target_acousticness;
            let target_danceability = currentUser[0].target_danceability;
            let target_energy = currentUser[0].target_energy;
            let target_instrumentalness =
              currentUser[0].target_instrumentalness;
            let target_key = currentUser[0].target_key;
            let target_liveness = currentUser[0].target_liveness;
            let target_speechiness = currentUser[0].target_speechiness;
            let target_tempo = currentUser[0].target_tempo;
            let target_valence = currentUser[0].target_valence;

            songURIs.forEach(async (songURI) => {
              const songData = await spotifyApi.getAudioFeaturesForTrack(
                songURI.substring(14)
              );
              target_acousticness =
                (target_acousticness + songData.body.acousticness) / 2;
              target_danceability =
                (target_danceability + songData.body.danceability) / 2;
              target_energy = (target_energy + songData.body.energy) / 2;
              target_instrumentalness =
                (target_instrumentalness + songData.body.instrumentalness) / 2;
              target_key = (target_key + songData.body.key) / 2;
              target_liveness = (target_liveness + songData.body.liveness) / 2;
              target_speechiness =
                (target_speechiness + songData.body.speechiness) / 2;
              target_tempo = (target_tempo + songData.body.tempo) / 2;
              target_valence = (target_valence + songData.body.valence) / 2;

              userEntry
                .findOneAndUpdate(
                  { spotifyID: userID },
                  {
                    $set: {
                      spotifyID: userID,
                      target_acousticness: target_acousticness.toFixed(5),
                      target_danceability: target_danceability.toFixed(5),
                      target_energy: target_energy.toFixed(5),
                      target_instrumentalness:
                        target_instrumentalness.toFixed(5),
                      target_key: Math.round(target_key), //integer
                      target_liveness: target_liveness.toFixed(5),
                      target_speechiness: target_speechiness.toFixed(5),
                      target_tempo: target_tempo.toFixed(5),
                      target_valence: target_valence.toFixed(5),
                    },
                  },
                  { new: true },
                  (err, doc) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                )
                .then(() => {
                  console.log("Updated user entry");
                });
            });
          }
        });
    })();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
