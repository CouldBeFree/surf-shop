const express = require('express');
const router = express.Router();

/* GET posts index /post */
router.get('/', (req, res, next) => {
    res.send('/INDEX/posts')
});

/* CREATE post index /post */
router.post('/', (req, res, next) => {
    res.send('CREATE /posts')
});

/* GET posts new posts/new */
router.get('/new', (req, res, next) => {
    res.send('NEW /posts/new')
});

/* POST posts create posts */
router.post('/new', (req, res, next) => {
    res.send('/posts')
});

/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('SHOW /posts/:id')
});

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/edit')
});

/* Update posts /posts/:id */
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id/edit')
});

/* Delete posts /posts/:id */
router.delete('/:id', (req, res, next) => {
    res.send('DELETE /posts/:id')
});

module.exports = router;
