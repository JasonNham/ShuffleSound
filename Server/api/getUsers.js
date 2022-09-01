const { Router } = require("express");

const router = Router();

const userEntry = require("../Models/userEntry");

var SpotifyWebApi = require("spotify-web-api-node");



router.get("/:authToken", async (req,res, next)=>{

//retrieves a json list of all the user's in our database
  try{ 
    const users = await userEntry.find({},
      { _id:1, spotifyID:1, display_name:1}); // this filters only ID's and Names
    res.status(200).json(users);
  }catch(err){
    res.status(500).json(err)
  }
});


module.exports = router;
