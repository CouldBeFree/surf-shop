const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const { reviewCreate, reviewDestroy, reviewUpdate } = require('../controllers/reviews');

/* CREATE post index /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* Update reviews /posts/:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* Delete reviews destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', asyncErrorHandler(reviewDestroy));

module.exports = router;
