const express = require('express');
const feed = require('../handlers/feed');

const router = express.Router();


router.get('/news', feed.getPosts);

module.exports = router;
