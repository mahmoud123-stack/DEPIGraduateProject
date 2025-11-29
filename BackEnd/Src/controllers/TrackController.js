const TrackModel = require("../models/Tracks.model");
const { GenerateTrackData } = require("../controllers/chatController");
const UserModel = require("../models/Users.model");
exports.chooseTrack = async (req, res) => {
  const { TrackName } = req.body;
  const userId = req.user.id;
  const existing = await TrackModel.findOne({ userId });
  if (existing) {
    return res.status(400).json({ msq: "user Already has a track" });
  }

  try {
    const GenerateData = await GenerateTrackData(TrackName);
    if (!GenerateData.success) {
      await res.status(404).json({ msg: "Erorr" });
      console.error(GenerateData.error);
    } else {
      const newTrack = await TrackModel.create({
        userId,
        trackName: TrackName,
        trackData: GenerateData,
      });
      await res.status(201).json({ msg: "Track Stored", data: newTrack });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getDashboardTrack = async (req, res) => {
  const userId = req.user.id;

  const track = await TrackModel.findOne({ userId });
  if (!track)
    return res.status(404).json({
      msg: "no tracks Choose One ",
    });
  res.status(200).json(track.trackData);
};

exports.updateTrack = async (req, res) => {
  const { newTrackName } = req.body;
  const userId = req.user.id;

  const existingTrack = await TrackModel.findOne({ userId });
  if (!existingTrack) return res.status(404).json({ msg: "no Track founded" });
  try {
    const newTrack = await GenerateTrackData(TrackName);
    if (!newTrack.success) {
      await res.status(404).json({ msg: "Erorr" });
      console.error(result.error);
    } else {
      existingTrack.trackName = newTrackName;
      existingTrack.trackData = newTrack;
      await existingTrack.save();
      res.status(200).json({ msg: "track Updated", data: existingTrack });
    }
  } catch (error) {
    console.log(error);
  }
};
