const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const { postIndex, postNew, postCreate, postShow, postEdit } = require('../controllers/posts');

/* GET posts index /post */
router.get('/', asyncErrorHandler(postIndex));

/* CREATE post index /post */
router.post('/', asyncErrorHandler(postCreate));

/* GET posts new posts/new */
router.get('/new', postNew);

/* POST posts create posts */
router.post('/new', (req, res, next) => {
    res.send('/posts')
});

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* Update posts /posts/:id */
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id/edit')
});

/* Delete posts /posts/:id */
router.delete('/:id', (req, res, next) => {
    res.send('DELETE /posts/:id')
});

module.exports = router;
