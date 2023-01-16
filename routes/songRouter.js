const express = require("express");
const router = express.Router();
const { allSongs, getOneSong, SearchAlbum } = require("../controllers/songs");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, allSongs)
router.get("/search/", isAuthenticated, SearchAlbum)
router.get("/:id", isAuthenticated, getOneSong )


module.exports = router;