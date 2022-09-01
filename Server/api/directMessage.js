const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");
const message = require("../Models/message");


// Creating new messages to be sent to the database
/* Unlike the other different methods of calls, using req 
requires you to send paramters through a post request
This needed to be done this way, because there is no
convenient way to send messages with spaces through
a header request(how most of our API enpoints are used)
as a result, we'll need to send post requests using 
[Request body parameters] this is sending the data in the body 
[
  spotifyID: requiredString,
  conversationID: {type: String},
  displayName: {type: String},
  songURI: {type: String},
  message: {type: String}
  
]*/
router.post("/:authToken", async (req, res)=>{
  const newMessage = new message(req.body);
  try{
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  }catch(err){
    res.status(500).json(err)
  }
})


// Retrieving messages from the database.
// Essentially you'll want to send the auth token, along with the conversationId
// Of the specific conversation you want to view to retrieve the messages.
router.get("/:conversationID", async (req, res, next) => {

  try{
    const messages = await message.find({
      conversationID: req.params.conversationID,
    });
    res.status(200).json(messages)
  } catch (err){
    res.status(500).json(err)
  }
});


module.exports = router;
