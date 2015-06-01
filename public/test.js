var Test = {};

var IMG_PATH = '../bin/images/parallax';

var RIGHT = false;
var LEFT = false;



Test.control = function() {

    var KEYBOARD = {
        UP: [38, 87],
        DOWN: [40, 83],
        RIGHT: [39, 68],
        LEFT: [37, 65]
    };

    document.onkeydown = function(e) {
        e = e || window.event;

        switch (e.keyCode) {
            case KEYBOARD.RIGHT[0]:
            case KEYBOARD.RIGHT[1]:
                RIGHT = true;
                break;

            case KEYBOARD.LEFT[0]:
            case KEYBOARD.LEFT[1]:
                LEFT = true;
                break;
        };
    };


    document.onkeyup = function(e) {
        e = e || window.event;

        switch (e.keyCode) {
            case KEYBOARD.RIGHT[0]:
            case KEYBOARD.RIGHT[1]:
                RIGHT = false;
                break;

            case KEYBOARD.LEFT[0]:
            case KEYBOARD.LEFT[1]:
                LEFT = false;
                break;
        };
    };


};




Test.init = function() {
    Test.insertCanvas();
    var imgW = 500;
    var imgH = 500;

    var $canvas = document.getElementById('viewport');
    var canvasWidth = $canvas.width;
    var canvasHeight = $canvas.height;

    var context = $canvas.getContext('2d');

    var startPosX = 0;


    Test.control();

    var image  = new Image();

    image.onload = function() {
        Test.newDraw(context, image, startPosX, imgW, canvasWidth, canvasHeight);
    };

    image.src = IMG_PATH + '/choco.jpg';

};

Test.clear = function(context, canvasWidth, canvasHeight) {
    context.clearRect(0,0,canvasWidth, canvasHeight);
};

Test.newDraw = function(context, image, startPosX, imgW, canvasWidth, canvasHeight) {

    startPosX += 100;



    var FPS = 1000/30;

    var secondPosX = startPosX - imgW;


    context.drawImage(image, startPosX, 0);

    var time = setInterval(function() {

        if (LEFT) {
            secondPosX = startPosX - imgW;


            context.clearRect(0,0,canvasWidth, canvasHeight);

            context.drawImage(image, startPosX, 0);

            console.log(secondPosX, startPosX);

            context.drawImage(image, secondPosX, 0);

            startPosX += 1;
            secondPosX += 1;
        }









        if (RIGHT) {
            context.clearRect(0,0,canvasWidth, canvasHeight);

            startPosX -= 1;
            context.drawImage(image, startPosX, 0);
        }

    }, FPS);


};


Test.draw = function(context, image, startPosX, imgW, canvasWidth, canvasHeight) {

    var FPS = 1000/10;

    var secondPosX;

    startPosX = canvasWidth - imgW;

    var time = setInterval(function() {

        if (LEFT) {
            Test.clear(context, canvasWidth, canvasHeight);

            context.drawImage(image, startPosX, 0);

            secondPosX = startPosX - canvasWidth;

            if (secondPosX <= 0) {
                context.drawImage(image, secondPosX + (canvasWidth - imgW), 0);

                if (secondPosX === 0) {
                    console.log('Done');
                    startPosX = canvasWidth - imgW;;
                }
             }


            startPosX += 5;
        }


        if (RIGHT) {
            Test.clear(context, canvasWidth, canvasHeight);

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

            startPosX -= 5;
        }






    }, FPS);
};


Test.insertCanvas = function() {
    var canvas = document.createElement('canvas');
    canvas.id = 'viewport';
    canvas.width = 1000;
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
