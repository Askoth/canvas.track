main.paintTrack = function (ctx, canvas) {

    var img = new Image();   // Create new img element

    img.onload = function() {

    	ctx.fillStyle = '#FFFFFF';
    	ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(img, 0, 0);
    };

    img.src = canvas.toDataURL();
};




