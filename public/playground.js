var Test = {};

var IMG_PATH = '/bin/images/playground'

var player = {
    x: 10,
    y: 235,
    width: 40,
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


    var level = new Image();
    level.onload = function() {
        context.drawImage(level, -20, 0);

    };
    level.src = IMG_PATH + '/level.jpg';


    var mario = new Image();
    mario.onload = function() {
        context.drawImage(mario, player.x, player.y, player.width, player.height);
        context.beginPath();
        context.closePath();
    };
    mario.src = IMG_PATH + '/mario.png';


    Test.renderLoop(canvasWidth, canvasHeight, context, level, mario);

    Test.control();

};

Test.renderLoop = function(cw, ch, context, level, mario) {

    setInterval(function() {

        context.clearRect(0, 0, cw, ch);
        context.drawImage(level, -20, 0);
        Test.insertGuideLine(context);
        context.drawImage(mario, player.x, player.y, player.width, player.height);

    }, 1000 / 30);

};

Test.insertGuideLine = function(context) {
    context.beginPath();

    context.strokeStyle = 'blue';
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
                break;

            case KEYBOARD.DOWN[0]:
            case KEYBOARD.DOWN[1]:
                self.down = true;
                break;

            case KEYBOARD.RIGHT[0]:
            case KEYBOARD.RIGHT[1]:
                player.x += 5;
                break;

            case KEYBOARD.LEFT[0]:
            case KEYBOARD.LEFT[1]:
                player.x -= 5;
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
