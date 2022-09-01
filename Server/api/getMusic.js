const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");
const userEntry = require("../Models/userEntry");
router.get("/:authToken", async (req, res, next) => {
  const token = req.params.authToken;

  //connect to DB and retrieve user data
  //retrieve values for preferred genres
  //retrieve values for song attributes
  allGenres = [
    "alt-rock",
    "bluegrass",
    "blues",
    "chill",
    "classical",
    "club",
    "country",
    "dance",
    "deep-house",
    "detroit-techno",
    "disney",
    "dubstep",
    "edm",
    "electronic",
    "emo",
    "folk",
    "grunge",
    "happy",
    "hard-rock",
    "hardcore",
    "hip-hop",
    "house",
    "indie-pop",
    "jazz",
    "k-pop",
    "latino",
    "new-release",
    "party",
    "piano",
    "pop",
    "punk-rock",
    "r-n-b",
    "reggae",
    "rock-n-roll",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "techno",
    "trip-hop",
    "work-out",
  ];

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    spotifyApi.setAccessToken(token);
    const userID = async () =>
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
      const user = await userID();

      var userData = userEntry
        .find({ spotifyID: user })
        .exec(function (err, currentUser) {
          if (err) {
            console.log(err);
          } else {
            //randomize genres with preferred
            var genreList = currentUser[0].preferred_genres;
            var randomGenres = getRandom(allGenres, 5);
            randomGenres.forEach(function (element) {
              if (!genreList.includes(element)) {
                genreList.push(element);
              }
            });
            var finalGenreShuffle = getRandom(genreList, 5);
            spotifyApi
              .getRecommendations({
                target_acousticness: currentUser[0].target_acousticness,
                target_danceability: currentUser[0].target_danceability,
                target_energy: currentUser[0].target_energy,
                target_instrumentalness: currentUser[0].target_instrumentalness,
                target_key: currentUser[0].target_key,
                target_liveness: currentUser[0].target_liveness,
                target_popularity: currentUser[0].target_popularity,
                target_speechiness: currentUser[0].target_speechiness,
                target_tempo: currentUser[0].target_tempo,
                target_valence: currentUser[0].target_valence,
                seed_genres: finalGenreShuffle,
                limit: 100,
              })
              .then(
                function (data) {
                  let recommendations = data.body;

                  res.json(recommendations);
                },
                function (err) {
                  console.log("Something went wrong!", err);
                  res.json(err);
                }
              );
          }
        });
    })();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
