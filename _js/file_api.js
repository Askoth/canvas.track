main.fileAPI = function (el, callback) {
    document.getElementById(el).addEventListener('change', function (e) {

        //console.log(e.target.files)
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = callback;


        // Read in the image file as a data URL.
        reader.readAsDataURL(e.target.files[0]);

    });
};