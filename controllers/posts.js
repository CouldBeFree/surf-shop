const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dkqkgqzoy',
    api_key: '726162821863997',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    async postIndex(req, res, next) {
        let posts = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 10
        });
        posts.page = Number(posts.page);
        res.render('posts/index', { posts })
    },

    postNew(req, res, next){
        res.render('posts/new')
    },

    async postCreate(req, res, next){
        req.body.post.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
        let response = await geocodingClient.forwardGeocode({
            query: req.body.post.location,
            limit: 1
        })
            .send();
        req.body.post.coordinates = response.body.features[0].geometry.coordinates;
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`)
    },

    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        res.render('posts/show', { post });
    },

    async postEdit(req, res, next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post })
    },

    async postUpdate(req, res, next){
        // handle any deletion of existing images
        // handle upload of any new images
        let post = await Post.findById(req.params.id);
        if(req.body.deleteImage && req.body.deleteImage.length) {
            let deleteImage = req.body.deleteImage;
            for(const public_id of deleteImage) {
                await cloudinary.v2.uploader.destroy(public_id);
                for(const image of post.images) {
                    if(image.public_id === public_id){
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1)
                    }
                }
            }
        }
        if(req.files){
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                })
            }
        }
        if(req.body.post.location !== post.location){
            let response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1
            })
                .send();
            post.coordinates = response.body.features[0].geometry.coordinates;
        }
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;
        post.save();
        res.redirect(`/posts/${post.id}`)
    },

    async postDestroy(req, res, next){
        let post = await Post.findById(req.params.id);
        for(const image of post.images){
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await post.remove();
        req.session.success = 'Post deleted';
        res.redirect('/posts');
    }
};
