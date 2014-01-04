(function () {
    var socket = io.connect('http://raspbmc:3000');

    function refreshImage() {
        document.getElementById('image').src = 'camera.jpg?' + new Date().getTime();
        document.getElementById('modified').innerHTML = 'Last modified: ' + new Date(data.time).toLocaleString();
    }

    socket.on('modified', function (data) {
        refreshImage();
    });

    refreshImage();
})();