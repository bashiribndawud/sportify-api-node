const mongoose = require('mongoose');


const playListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    songId: {
      type: String,
      ref: "Songs"
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlayList = mongoose.model("PlayList", playListSchema)

module.exports = PlayList