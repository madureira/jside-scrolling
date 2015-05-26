var Test = {};

var IMG_PATH = '../bin/img/parallax';

Test.init = function() {
    Test.insertCanvas();
    var imgW = 720;
    var imgH = 500;

    var $canvas = document.getElementById('viewport');
    var canvasWidth = $canvas.width;
    var canvasHeight = $canvas.height;

    var context = $canvas.getContext('2d');

    var startPosX = 0;


    var image  = new Image();

    image.onload = function() {
        Test.draw(context, image, startPosX, imgW, canvasWidth, canvasHeight);
    };

    image.src = IMG_PATH + '/choco.jpg';

};

Test.draw = function(context, image, startPosX, imgW, canvasWidth, canvasHeight) {

    var FPS = 1000/60;

    var secondPosX;

    var time = setInterval(function() {
        context.clearRect(0,0,canvasWidth, canvasHeight);

        context.drawImage(image, startPosX, 0);

        secondPosX = imgW + startPosX;

        if (startPosX < canvasWidth) {
            context.drawImage(image, secondPosX, 0);

            var pos = canvasWidth - Math.abs(startPosX);
            var size = canvasWidth - imgW;

            if (pos <= size) {
                startPosX = secondPosX;
            }
        }

        startPosX -= 1;
    }, FPS);
};


Test.insertCanvas = function() {
    var canvas = document.createElement('canvas');
    canvas.id = 'viewport';
    canvas.width = 600;
    canvas.height = 300;
    canvas.style.border = '1px solid red';

    document.getElementById('stage').appendChild(canvas);
};


var isReady = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(isReady);
        Test.init();
    }
}, 50);
