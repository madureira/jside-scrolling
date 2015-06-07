var Test = {};

var IMG_PATH = '../bin/images/tests'

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
        //context.strokeStyle = 'rgba(0,0,0,0.5)';
        //context.fillStyle = 'rgba(0,0,0,0.5)';
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
    };
    image.src = IMG_PATH + '/level.jpg';

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
