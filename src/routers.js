const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);
const routes = new express.Router();

routes.post('/posts',upload.single('image'),PostController.store);  
routes.get('/posts',PostController.index);  

routes.post('/like/:id',LikeController.store);

module.exports = routes;