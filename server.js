var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { log: false });
var fs = require('fs');

var imagePath = '/home/pi/camera';

app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/camera.jpg', function (req, res) {
    res.sendfile(imagePath + '/surveillance.jpeg');
});

io.sockets.on('connection', function (socket) {
    fs.watch(imagePath, function () {
        socket.emit('camera', { status: 'updated' });
    });
});

server.listen(3000);
console.log('Listening on port 3000');