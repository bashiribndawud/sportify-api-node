const PlayList = require("../models/playlistModel");

const create = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ err: "Please provide all fields" });
    }
    const { id } = req.user;

    const newplayList = new PlayList({
      userId: id,
      name,
      description,
    });

    const savedPlayList = await newplayList.save();
    return res.status(200).json({
      msg: "Playlist Created",
      newplayList,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const allPlayList = async (req, res) => {
  try {
    const { id } = req.user;
    const authUserPlayList = await PlayList.find({ userId: id });
    if (!authUserPlayList) {
      return res.status(404).json({ err: "You do not have a playlist" });
    }
    return res.status(200).json({ authUserPlayList });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOnePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playList = await PlayList.findById(playlistId);
    if (!playList) {
      return res.status(404).json({ err: "Item in playlist not found" });
    }
    return res.status(200).json(playList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    const updatedplayList = await PlayList.updateOne(
      { _id: playlistId },
      { name, description }
    );
    return res.status(200).json({ msg: "success", updatedplayList });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;
    await PlayList.findByIdAndDelete({ _id: playlistId });
    return res.status(200).json({ success: "Playlist deleted" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const AddSong = async (req, res) => {
  try {
    const { songId } = req.params;
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create,
  allPlayList,
  getOnePlayList,
  updatePlayList,
  deletePlayList,
  AddSong,
};
