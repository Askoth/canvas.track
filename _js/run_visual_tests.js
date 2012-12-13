window.main.runVisualTests = function (mapArr, ctx) {
    setTimeout(function () {
        //###### test the coordinates ######
        // console.log('[testing coordinated] start');

        var i = mapArr.length;

        ctx.strokeStyle = "rgb(200,0,0)";
        // ctx.strokeRect (0, 0, 13, 13);

        while (i--) {
            ctx.strokeRect(mapArr[i][0], mapArr[i][1], 13, 13);
        }

    }, 1000)


    var dummy = document.createElement('div'),
        dummyIndex = 0;

    dummy.id = 'test-dummy';

    document.getElementById('canvas-wrap').appendChild(dummy);

    moveDummy();

    function moveDummy () {

        dummy.style.left = mapArr[dummyIndex][0] + 'px';
        dummy.style.top = mapArr[dummyIndex][1] + 'px';

        dummyIndex++;
        dummyIndex = dummyIndex > mapArr.length -1 ? 0 : dummyIndex;

        setTimeout(moveDummy, 1000)
    }
}
