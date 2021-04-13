const { getAllVideos, getOneVideo } = require('../services/video.services.js');

const { ErrorHandler } = require('../utils/error.utils');
const {limitStreams} = require('../utils/stream.utils')

// GET all ivideos
exports.getAll = async (req, res, next) => {
  try {
    const videos = getAllVideos();
    res.json({ data: videos });
  } catch (error) {
    next(error);
  }
};

// GET single video
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const video = getOneVideo(id);

    if (!video) {
      throw new ErrorHandler(404, `Video ${id} not found.`);
    }

    const [streams, error] = limitStreams(id, req.session.streams)
    if (error) {
      throw new ErrorHandler(403, error.msg);
    }
    req.session.streams = streams;
    
    res.json({
      data: video
    })
  } catch (error) {
    next(error);
  }
};
