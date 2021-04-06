const { ErrorHandler } = require('../utils/error.utils');

// dummy data
const VIDEOS = [
  {
    id: '75c4a8c5-0128-432d-b500-d049f59a2769',
    name: 'Video 1',
  },
  {
    id: '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
    name: 'Video 2',
  },
  {
    id: '862c6229-abfd-47fb-961c-6734cf583646',
    name: 'Video 3',
  },
  {
    id: 'e65a0162-1cd6-4ba8-8434-b597f160e5c8',
    name: 'Video 4',
  },
];

// GET all ivideos
exports.getAll = async (req, res, next) => {
  try {
    const videos = [...VIDEOS];
    res.json({ data: videos });
  } catch (error) {
    next(error);
  }
};

// GET single video
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const video = VIDEOS.find(v => v.id === id);
    if (!video) {
      throw new ErrorHandler(404, `Video ${id} not found`);
    }
    res.json({ data: video });
  } catch (error) {
    next(error);
  }
};
