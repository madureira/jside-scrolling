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
        context.moveTo(0, 280);
        context.lineTo(50,280);
        context.lineTo(115,245);
        context.lineTo(150,280);
        context.lineTo(165,280);
        context.lineTo(165,250);
        context.lineTo(190,250);
        //context.bezierCurveTo(140, 10, 388, 10, 388, 170);
        context.lineWidth = 10;
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
