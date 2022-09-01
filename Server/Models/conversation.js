const mongoose = require("mongoose");

const { Schema } = mongoose;

// CONVERSATION

const conversationSchema = new Schema(
  {
    // Contains our user ID's (Just to contain conversation id and members)
    members: []
  },
  {
    timestamps: true,
  }
);


const conversation = mongoose.model("conversation", conversationSchema);;

module.exports = conversation;