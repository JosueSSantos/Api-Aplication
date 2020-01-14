const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());

const server = require('http').Server(app);
const io = require('socket.io')(server);



mongoose.connect('mongodb+srv://SantosDev:87831107@cluster0-oz5yp.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000
});

app.use(cors());
app.use((req, res) => {
    req.io = io;
    
    next();
});

mongoose.connection.on('error', () => {
    throw new Error('error upon connection')
}).on('open', () => {
    console.log('Connected successfully');
})
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); 

app.use(require('./routers'));

server.listen(3003);