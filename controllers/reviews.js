const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
    // Reviews create
    async reviewCreate(req, res, next){
        let post = await Post.findById(req.params.id);
        // req.body.review.author = req.user._id
        let review = await Review.create(req.body.review);
        console.log(post);
        post.reviews.push(review);
        post.save();
        req.sessions.success = 'Review created successfully!';
        res.redirect(`/posts/${post.id}`)
    },
    // Reviews update
    async reviewUpdate(req, res, next){

    },
    // Reviews destroy
    async reviewDestroy(req, res, next){

    }
};
