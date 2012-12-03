var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');



document.getElementById('fileInput').addEventListener('change', function (e) {

  //console.log(e.target.files)

  var reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = doMagic;


  // Read in the image file as a data URL.
  reader.readAsDataURL(e.target.files[0]);

});

function doMagic (e) {
  // Render
  var img = new Image();

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL();

      // set canvasImg image src to dataURL
      // so it can be saved as an image
      document.getElementById('image').src = dataURL;
  }

  img.src = e.target.result;

};