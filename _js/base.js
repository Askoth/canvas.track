(function () {
    'use strict';

    //guide http://beej.us/blog/data/html5s-canvas-2-pixel/
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        // imageCallback,
        setCenterToSort;


    main.fileAPI('inp-image', function (e) {
        var img = new Image();   // Create new img element
        // Render

        img.onload = function() {

            var canvasBg = document.getElementById('canvas-bg'),
                ctxBg = canvasBg.getContext('2d'),
                canvasWrap = document.getElementById('canvas-wrap');

            canvas.width = img.width;
            canvas.height = img.height;

            canvasBg.width = img.width;
            canvasBg.height = img.height;

            canvasWrap.style.width = img.width + 'px';
            canvasWrap.style.height = img.height + 'px';

            ctxBg.drawImage(img, 0, 0);

            setCenterToSort = [img.width/2, img.height/2];

            showCenter();

            // var dataURL = canvas.toDataURL();

            // // set canvasImg image src to dataURL
            // // so it can be saved as an image
            // document.getElementById('image').src = dataURL;
        }

        img.src = e.target.result;

    });


    main.paintDots(ctx);


    function showCenter () {
        //show center
        ctx.strokeStyle = "rgba(0,0,0, 0.7)";
        console.log('[setCenterToSort]', setCenterToSort[0], setCenterToSort[1]);
        // ctx.strokeRect(setCenterToSort[0], setCenterToSort[1], 1, 1);
        ctx.beginPath();
        ctx.moveTo(setCenterToSort[0], setCenterToSort[1] - 10);
        ctx.lineTo(setCenterToSort[0], setCenterToSort[1] + 10);
        ctx.moveTo(setCenterToSort[0] - 10, setCenterToSort[1]);
        ctx.lineTo(setCenterToSort[0] + 10, setCenterToSort[1]);
        // ctx.lineTo(100,25);
        ctx.stroke();

    }

/*



    img.onload = function() {
        // execute drawImage statements here

        ctx.drawImage(img, 0, 0);

        // ctx.fillStyle = "rgb(200,0,0)";
        // ctx.fillRect (0, 0, 13, 13);

        imageCallback( ctx.getImageData(0, 0, canvas.width, canvas.height) );
    };

    // img.src = '/static/_anim/_imgs/lights-bitmap.png'
    // img.src = '/static/_anim/_imgs/lights-bitmap-hub1.png'
    img.src = '/_anim/_imgs/lights-bitmap-hub3.png'

*/

    function mapDots (imgDataArr) {

        var curAlpha = 0,
            imgDataHeight = canvas.height,
            imgDataWidth = canvas.width,
            imgDataLength = imgDataArr.length,
            i = 0,
            x = 0,
            y = 0,
            mapArr = [];

        //###### populate array ######
        console.log('[imageCallback] reads image data');
        for (i=0; i < imgDataLength; i +=4) {

            curAlpha = i + 3;

            if (imgDataArr[curAlpha] > 0) { //i == red, 0 means black

                if (imgDataArr[curAlpha-4] < 1) { //left one is white

                    if (imgDataArr[curAlpha - (imgDataWidth * 4)] > 0) {

                        y = Math.floor((i/4)/imgDataWidth);

                        x = Math.floor((i/4) - (imgDataWidth * y));

                        mapArr.push([x, y]);

                        // imgDataArr[i] = 255;
                    }

                }

            }
        }
        console.log('imgDataArr[0]', imgDataArr[0], 'imgDataArr[1]', imgDataArr[1], 'imgDataArr[2]', imgDataArr[2], 'imgDataArr[3]', imgDataArr[3]);
        console.log('mapArr', mapArr, 'i:',i);

        console.log('[imageCallback] done reading image data');
        //END populate array
    }

    document.getElementById('inp-start-track').addEventListener('click', function () {

        var imgDataArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            mapArr;

        mapArr = mapDots(imgDataArr);

    });
/*
        // not being used
        // ctx.putImageData(imgData, 0, 0);

        // sorting array by the center of the image
        // starting from quadrant 1, 3, 4, 2 (clockwise)
        var setCenterToSort = [imgDataWidth/2, imgDataHeight/2 - 10],
            quadrantOrder = [1, 4, 3, 2],
            findQuadrant = function (pos, center) {
                //find where is the dot compared to the center
                if (pos[0] >= center[0] && pos[1] < center[1]) {
                    //quadrant 1
                    return 1;
                } else if (pos[0] >= center[0] && pos[1] >= center[1]) {
                    //quadrant 4
                    return 4;

                } else if (pos[0] < center[0] && pos[1] >= center[1]) {
                    //quadrant 3
                    return 3;

                } else if (pos[0] < center[0] && pos[1] < center[1]) {
                    //quadrant 2
                    return 2;

                }
            },
            findDegree = function (x, y) {

            var cat_adj = x - setCenterToSort[0],
                cat_op = setCenterToSort[1] - y,
                hip = Math.sqrt(Math.pow(cat_adj,2) + Math.pow(cat_op,2));

                return Math.asin(cat_op / hip)/(Math.PI / 180)

            };

        //show center
        ctx.strokeStyle = "rgba(0,0,0, 0.7)";
        console.log('[setCenterToSort]', setCenterToSort[0], setCenterToSort[1]);
        // ctx.strokeRect(setCenterToSort[0], setCenterToSort[1], 1, 1);
        ctx.beginPath();
        ctx.moveTo(setCenterToSort[0], setCenterToSort[1] - 10);
        ctx.lineTo(setCenterToSort[0], setCenterToSort[1] + 10);
        ctx.moveTo(setCenterToSort[0] - 10, setCenterToSort[1]);
        ctx.lineTo(setCenterToSort[0] + 10, setCenterToSort[1]);
        // ctx.lineTo(100,25);
        ctx.stroke();


        //sorts to make all elements go clockwise
        mapArr.sort(function (a, b) {

            var aQ = findQuadrant(a, setCenterToSort),
                bQ = findQuadrant(b, setCenterToSort);

            if (aQ == bQ) {
                //check inside quadrant rules

                if (aQ == 1) {
                    if (findDegree(a[0], a[1]) < findDegree(b[0], b[1])) {
                        return +1;
                    } else {
                        return -1;
                    }

                } else if (aQ == 4) {
                    if (findDegree(a[0], a[1]) > findDegree(b[0], b[1])) {
                        return -1;
                    } else {
                        return +1
                    }

                } else if (aQ == 3) {
                    if (findDegree(a[0], a[1]) > findDegree(b[0], b[1])) {
                        return +1;
                    } else {
                        return -1
                    }

                } else {
                    if (findDegree(a[0], a[1]) < findDegree(b[0], b[1])) {
                        return -1;
                    } else {
                        return +1
                    }

                }

            } else {

                return quadrantOrder.indexOf(aQ) - quadrantOrder.indexOf(bQ);

            }

        });



        //###### test the coordinates ######
        console.log('[testing coordinated] start');

        i = mapArr.length;

        ctx.strokeStyle = "rgb(200,0,0)";
        // ctx.strokeRect (0, 0, 13, 13);

        while (i--) {
            ctx.strokeRect(mapArr[i][0], mapArr[i][1], 13, 13);
        }

        console.log('[testing coordinated] stop');


        //###### test the order ######
        var dummy = document.getElementById('test-dummy'),
            i = 0,
            interval = 500,
            doAgain = function () {

                i++;

                if (i >= mapArr.length) {
                    i = 0;
                }

                doTest(mapArr[i][0], mapArr[i][1]);

                setTimeout(doAgain, interval)

            },
            doTest = function (x, y) {
                dummy.style.left = x + "px"
                dummy.style.top = y + "px"
            };

            doTest(mapArr[0][0], mapArr[0][1]);


            setTimeout(doAgain, interval)



        //###### result array ######
        document.getElementById('result-to-array').innerHTML = JSON.stringify(mapArr)
            .replace(/\[/, '[<br />') //first
            .replace(/\]$/, '<br />]') //last
            .replace(/(\[)([0-9|\,]+\])/g, '&nbsp;&nbsp;&nbsp;&nbsp;$1$2') //indent
            .replace(/\],/g, '],<br />'); //commas



        };

*/
})();