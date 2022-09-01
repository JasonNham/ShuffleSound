const { Router } = require("express");
const router = Router();
var SpotifyWebApi = require("spotify-web-api-node");
const Conversation = require("../Models/conversation");
//FOR MESSAGE.JS COLLECTION

// [POST] This block is to create a new conversation for a user
router.post("/:senderId/:receiverId", async (req,res, next)=>{

  // Getting the values out of the api url call
  const token = req.params.authToken;
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;
  // takes the senderId and receiverId and creates a new conversation in the database for both users.
  const currentConversations = await Conversation.find({
    members:{ $in:[senderId]}
  })

  // Checks if the same ID is used twice on the frontend
  if(senderId === receiverId){
    res.status(500).json("Same ID error");
  }

  // The below variables dictate the actions and the data 
  // That will be used in the end result.
  var convoSaveAction = false;
  var conversationResult = [];


  for(let i = 0; i < currentConversations.length; i++){
    // If there is an existing entry in the database it will set the result to that entry
    // and set the saveAction to true and then break out of the loop.
    if((currentConversations[i].members[0] === senderId && currentConversations[i].members[1] === receiverId)||
    (currentConversations[i].members[0] === receiverId && currentConversations[i].members[1] === senderId)){
      conversationResult = currentConversations[i];
      convoSaveAction = true;
      break;
    }
  }


  // Otherwise it will create the new conversation to be sent to the database
  if(!convoSaveAction){
    conversationResult = new Conversation({
      members:[senderId, receiverId],
    });
  }

  try{ 
    if(convoSaveAction){
      res.status(200).json(conversationResult);
    }else{
      const savedConversation = await conversationResult.save();
      res.status(200).json(savedConversation);
    }
  }catch(err){
    res.status(500).json(err)
  }
});

// [GET] This block is to retrieve the conversations of the user
router.get("/:userId", async (req, res, next) => {
  const token = req.params.authToken;
  const userId = req.params.userId;

  /* takes the userId from the request parameter and finds all conversations in the database
  that include the specific userId */
  try{
    const conversation = await Conversation.find({
      members:{ $in:[userId]}
    })
    res.status(200).json(conversation);
  } catch (err){
    res.status(500).json(err);
  }
});


module.exports = router;
