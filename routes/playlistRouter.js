const express = require("express");
const router = express.Router();
const {
  create,
  allPlayList,
  getOnePlayList,
  updatePlayList,
  deletePlayList,
  AddSong,
} = require("../controllers/playlist");
const isAuthenticated = require("../middleware/auth");

router.post("/playlists", isAuthenticated, create);
router.get("/playlists", isAuthenticated, allPlayList);
router.get("/playlists/:playlistId", isAuthenticated, getOnePlayList);
router.put("/playlists/:playlistId", isAuthenticated, updatePlayList);
router.delete("/playlists/:playlistId", isAuthenticated, deletePlayList);
router.post("/playlists/:songId/songs", isAuthenticated, AddSong);

module.exports = router;

