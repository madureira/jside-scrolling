var Test = {};

var IMG_PATH = '../bin/images/tests'

var player = {
    x: 0,
    y: 235,
    width: 20,
    height: 40,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false
};


Test.init = function() {
    Test.insertCanvas();

    var $canvas = document.getElementById('viewport');

    var canvasWidth = $canvas.width;
    var canvasHeight = $canvas.height;

    var context = $canvas.getContext('2d');


    var image  = new Image();
    image.onload = function() {
        context.drawImage(image, -20, 0);

        context.beginPath();

        context.strokeStyle = '#ff0000';
        context.lineWidth = 10;

        context.moveTo(0, 280);
        context.lineTo(50,280);
        context.lineTo(115,245);
        context.lineTo(150,280);
        context.lineTo(165,280);
        context.lineTo(165,250);
        context.lineTo(185,250);
        context.lineTo(185,228);
        context.lineTo(215,228);
        context.lineTo(215,280);
        context.lineTo(260,280);
        context.lineTo(260,250);
        context.lineTo(285,250);
        context.lineTo(285,280);
        context.lineTo(310,280);
        context.bezierCurveTo(500, 210, 330, 320, 580, 250);
        context.lineTo(630,280);
        context.lineTo(650,280);

        context.stroke();
        context.closePath();


        context.beginPath();
        context.fillStyle = "blue";
        context.fillRect(player.x, player.y, player.width, player.height);
        context.closePath();
    };

    image.src = IMG_PATH + '/level.jpg';


    Test.control();

};

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
            case KEYBOARD.UP[0]:
            case KEYBOARD.UP[1]:
                self.up = true;
                break;

            case KEYBOARD.DOWN[0]:
            case KEYBOARD.DOWN[1]:
                self.down = true;
                break;

            case KEYBOARD.RIGHT[0]:
            case KEYBOARD.RIGHT[1]:
                self.right = true;
                break;

            case KEYBOARD.LEFT[0]:
            case KEYBOARD.LEFT[1]:
                self.left = true;
                break;
        };
    };


    document.onkeyup = function(e) {
        e = e || window.event;

        switch (e.keyCode) {
            case KEYBOARD.UP[0]:
            case KEYBOARD.UP[1]:
                self.up = false;
                break;

            case KEYBOARD.DOWN[0]:
            case KEYBOARD.DOWN[1]:
                self.down = false;
                break;

            case KEYBOARD.RIGHT[0]:
            case KEYBOARD.RIGHT[1]:
                self.right = false;
                break;

            case KEYBOARD.LEFT[0]:
            case KEYBOARD.LEFT[1]:
                self.left = false;
                break;
        };
    };

};




Test.insertCanvas = function() {
    var canvas = document.createElement('canvas');
    canvas.id = 'viewport';
    canvas.width = 640;
    canvas.height = 330;
    canvas.style.border = '1px solid red';

    document.getElementById('stage').appendChild(canvas);
};

var isReady = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(isReady);
        Test.init();
    }
}, 50);
