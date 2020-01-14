const Post = require('../models/Post');

module.exports = {
    async store(req,res){
        const posts = await Post.findById(req.params.id);
        
        posts.likes += 1;
        
        await posts.save();

        req.io.emit('Like', posts);
        
        return res.json(posts);

    }
};