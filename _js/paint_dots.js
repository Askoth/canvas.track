main.paintDots = function (ctx) {


    document.getElementById('canvas').addEventListener('click', function (e) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect (e.layerX, e.layerY, 13, 13);
    });
};
