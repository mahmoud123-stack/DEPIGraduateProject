const express = require("express");
const router = express.Router();
const {
  chooseTrack,
  getDashboardTrack,
  updateTrack,
} = require("../controllers/TrackController");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/choose", verifyToken, chooseTrack);
router.get("/dashboard-track", verifyToken, getDashboardTrack);
router.put("/update-track", verifyToken, updateTrack);

module.exports = router;

