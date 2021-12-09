var express = require('express');
var app = express();
var server = require('http').createServer(app);

const { exec } = require('child_process');

var imagePath = '/tmp';
var imageFullPath = imagePath + '/test.jpg';

app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/camera.jpg', function (req, res) {
    exec('libcamera-jpeg -o /tmp/camera.jpg', (error, stdout, stderr) => {
        if (error) {
	    console.error(`exec error: ${error}`);
            return;
       }
       console.log(`stdout: ${stdout}`);
       console.error(`stderr: ${stderr}`);

       res.sendfile(imageFullPath);
   });
});

server.listen(3000);
console.log('Listening on port 3000');
