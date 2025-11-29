const mongoose = require("mongoose");
var TrackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    trackName: { type: String, required: true },
    trackData: {
      type: Object,
      required: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Track", TrackSchema);
