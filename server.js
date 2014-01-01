var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { log: false });
var fs = require('fs');

var imagePath = '/home/pi/camera';
var imageFullPath = imagePath + '/surveillance.jpeg';

app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/camera.jpg', function (req, res) {
    res.sendfile(imageFullPath);
});

io.sockets.on('connection', function (socket) {
    fs.stat(imageFullPath, function (err, stats) {
        socket.emit('modified', { time: stats.mtime });
    });

    fs.watch(imagePath, function () {
        fs.stat(imageFullPath, function (err, stats) {
            socket.emit('camera', { status: 'updated' });
            socket.emit('modified', { time: stats.mtime });
        });
    });
});

server.listen(3000);
console.log('Listening on port 3000');