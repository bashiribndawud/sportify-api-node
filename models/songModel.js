const mongoose = require('mongoose');


const songSchema = mongoose.Schema(
  {
    artist_name: {
      type: String,
      required,
    },
    album: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Song = mongoose.model("Songs", songSchema)
module.exports = Song