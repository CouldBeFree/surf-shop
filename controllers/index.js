const User = require('../models/user');

module.exports = {
    async postRegister(req, res, next){
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            image: req.body.image
        });
        await User.register(newUser, req.body.password);
        res.redirect('/');
    }
};
