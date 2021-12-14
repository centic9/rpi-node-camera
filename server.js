var express = require('express');
var app = express();
var server = require('http').createServer(app);

const { exec } = require('child_process');

var imagePath = '/tmp/camera.jpg';

app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/camera.jpg', function (req, res) {
    exec('libcamera-jpeg -o ' + imagePath + ' -t 1 -n', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500);
            res.send(`exec error: ${error}`);
            res.end();

            return;
       }
       console.log(`stdout: ${stdout}`);
       console.error(`stderr: ${stderr}`);

       res.set('Content-Type', 'image/jpg');
       res.sendfile(imagePath);
   });
});

server.listen(3000);
console.log('Listening on port 3000');
