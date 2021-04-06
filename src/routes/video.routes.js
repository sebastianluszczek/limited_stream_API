const { getAll, getOne } = require('../controllers/video.controllers.js');

const router = require('express').Router();

// Retrieve all Videos
router.get('/', getAll);

// Retrieve a single Video with id
router.get('/:id', getOne);

module.exports = router;
