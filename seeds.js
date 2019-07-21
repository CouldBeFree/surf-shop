const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
    await Post.remove({});
    for(const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id' : '5d2ae413b39161497cb68c34',
                'username' : 'sasha'
            }
        };
        await Post.create(post);
    }
    console.log('Posts created')
}

module.exports = seedPosts;
