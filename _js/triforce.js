//Trigonometry force!!!

window.main.triforce = (function () {

    // sorting array by the center of the image
    // starting from quadrant 1, 3, 4, 2 (clockwise)
    var quadrantOrder = [1, 4, 3, 2],
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

        var cat_adj = x - main.triforce.setCenterToSort[0],
            cat_op = main.triforce.setCenterToSort[1] - y,
            hip = Math.sqrt(Math.pow(cat_adj,2) + Math.pow(cat_op,2));

            return Math.asin(cat_op / hip)/(Math.PI / 180)

        },
        sortFn = function (a, b) {

            var aQ = findQuadrant(a, main.triforce.setCenterToSort),
                bQ = findQuadrant(b, main.triforce.setCenterToSort);

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

        };


    return {
        findQuadrant: findQuadrant,
        findDegree: findDegree,
        sortFn: sortFn
    };
})();
