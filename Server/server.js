const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5050;
const middlewares = require("./middlewares");
const getMusic = require("./api/getMusic");
const userData = require("./api/userData");
const updateUser = require("./api/updateUser");
const likeSong = require("./api/likeSong");
const unlikeSong = require("./api/unlikeSong");
const getPlaylists = require("./api/getPlaylists");
const addToPlaylist = require("./api/addToPlaylist");
const checkLiked = require("./api/checkLiked");
const search = require("./api/search");
const profile = require("./api/profile");
const getProfilePlaylists = require("./api/getProfilePlaylists");
const getLikedSongs = require("./api/getLikedSongs");
const path = require("path");
const cors = require("cors");

//Jason's Section of his API
const directMessage = require("./api/directMessage");
const inbox = require("./api/inbox");
const getUsers = require("./api/getUsers");
const bodyParser = require('body-parser');

require("dotenv").config();
app.use(express.static("Express"));
app.use(cors());

app.use("/api/getMusic", getMusic);
app.use("/api/userData", userData);
app.use("/api/updateUser", updateUser);
app.use("/api/likeSong", likeSong);
app.use("/api/unlikeSong", unlikeSong);
app.use("/api/getPlaylists", getPlaylists);
app.use("/api/addToPlaylist", addToPlaylist);
app.use("/api/search", search);
app.use("/api/profile", profile);
app.use("/api/checkLiked", checkLiked);

// Jason's section he's working on
app.use(bodyParser.json());
app.use("/api/directMessage", directMessage);
app.use("/api/inbox", inbox);
app.use("/api/getUsers", getUsers);

//nicks section
app.use("/api/getProfilePlaylists", getProfilePlaylists);
app.use("/api/getLikedSongs", getLikedSongs);

app.use(express.static(path.join(__dirname, "Express")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Express", "index.html"));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "Express", "login.html"));
});
app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname, "Express", "dashboard.html"));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    });

  console.log(`Now listening on port ${port}`);
});
