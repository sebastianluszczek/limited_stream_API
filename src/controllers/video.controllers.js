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
      throw new ErrorHandler(404, `Video ${id} not found.`);
    }

    const stream = { id, time: new Date() };

    if (req.session.streams) {
      const updateStream = req.session.streams.map(s => s.id).includes(id);
      const buffTime = 1000 * 10;

      req.session.streams = req.session.streams.filter(
        s => new Date() - new Date(s.time) < buffTime
      );

      if (req.session.streams.length >= 3) {
        throw new ErrorHandler(
          403,
          `User exceeded max number of streams watched at the same time (3).`
        );
      }

      req.session.streams = updateStream
        ? req.session.streams.map(s =>
            s.id === id ? { id, time: new Date() } : s
          )
        : [...req.session.streams, stream];
    } else {
      req.session.streams = [stream];
    }

    res.json({ data: video });
  } catch (error) {
    next(error);
  }
};
