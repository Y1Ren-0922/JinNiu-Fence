const stringToList = function (oldPointList) {

    oldPointList = oldPointList.replace(/],/g, '],a');

    let pointList = [];
    if (oldPointList != 0) {
        let path = oldPointList.substr(1)
        path = path.slice(0, path.length - 1) //上面两步将 "[[101,32],a [12,132]]" 转换为"[101,32],a [12,132]"，去掉外层[]

        for (let i = 0; i < path.split(",a").length; i++) //for循环,首先将数据按",a"分割为[['[101,32]'],'[12,132]'],的数组，此步内部仍然为字符串，使用for循环按个访问外部数组的每个元素
        {
            let pathLng = path.split(",a")[i].replace("[", "").replace("]", "").split(", ")[0] * 1//此步 将'[101,32]'的101转换为number类型
            let pathLat = path.split(",a")[i].replace("[", "").replace("]", "").split(", ")[1] * 1 //此步将'[101,32]'的32转换为number类型
            let point = [pathLng, pathLat] //再将number类型存在数组中
            pointList.push(point)//新开一个pointList存储这些数组，转换为[[101,32]]的二维数组
        }

    }
    return pointList;
}

const getStandardTime = function (time) {
    // `8 * 3600 * 1000 补充时差` 北京东八区所以补八个小时 
    return new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

const getTTime = function (time) {
    return new Date(+new Date(time) + 8 * 3600 * 1000).toISOString();
}

const sortPoint = function (pointList) {
    let points = [];
    let tmpPoints = [];
    let res = [];
    for (let i = 0; i < pointList.length; i++) {
        let point = {
            x: pointList[i][0],
            y: pointList[i][1],
        }

        tmpPoints.push(point)
    }

    tmpPoints = tmpPoints.sort((pointA, pointB) => {
        return pointA.x - pointB.x;
    })

    let firstPoint = tmpPoints[0];
    let lastPoint = tmpPoints[tmpPoints.length - 1];

    let smallXPoint = tmpPoints.filter(point => point.x === firstPoint.x);
    let bigXPoint = tmpPoints.filter(point => point.x === lastPoint.x);

    if (smallXPoint.length > 1) {
        smallXPoint.sort((pointA, pointB) => {
            return pointB.y - pointA.y;
        })
    }

    if (bigXPoint.length > 1) {
        bigXPoint.sort((pointA, pointB) => {
            return pointB.y - pointA.y;
        })
    }

    firstPoint = smallXPoint[0];
    lastPoint = bigXPoint[0];

    let splitLineAngle = Math.atan2(lastPoint.y - firstPoint.y, lastPoint.x - firstPoint.x);
    let upperPoints = [];
    let lowerPoints = [];

    tmpPoints.forEach(point => {
        if (point === firstPoint || point === lastPoint) {
            return false;
        }
        let angle = Math.atan2(point.y - firstPoint.y, point.x - firstPoint.x);
        if (angle > splitLineAngle) {
            lowerPoints.push(point);
        } else {
            upperPoints.push(point);
        }
    })

    lowerPoints = lowerPoints.sort((pointA, pointB) => {
        if (pointA.x !== pointB.x) {
            return pointA.x - pointB.x;
        }
        return pointB.y - pointA.y;
    })

    upperPoints = upperPoints.sort((pointA, pointB) => {
        if (pointA.x !== pointB.x) {
            return pointB.x - pointA.x;
        }
        return pointA.y - pointB.y;
    })

    points = [firstPoint].concat(lowerPoints, [lastPoint], upperPoints);

    for (let i in points) {
        res[i] = [points[i].x, points[i].y];
    }

    return res;
}

const stringToSingleLocation = path => {
    let pathLng = path.replace("[", "").replace("]", "").split(",")[0] * 1;
    let pathLat = path.replace("[", "").replace("]", "").split(",")[1] * 1;
    return [pathLng, pathLat];
}


// const sortMarker = (markerList) => {
//     let geometryPoints = [];
//     let maxXPointIdx = 0;
//     for (let i = 0; i < markerList.length; i++) {
//         let gp = {
//             X: markerList[i][0],
//             Y: markerList[i][1],
//             slope: null,
//         };
//         geometryPoints.push(gp);
//         if (geometryPoints[maxXPointIdx].X < gp.X) {
//             maxXPointIdx = i;
//         }
//         else if (geometryPoints[maxXPointIdx].X == gp.X && geometryPoints[maxXPointIdx].Y > gp.Y) {
//             maxXPointIdx = i;
//         }
//     }
//     for (let i = 0; i < markerList.length; i++) {
//         if (i == maxXPointIdx) {
//             geometryPoints[i].slope = 1000000000;
//         }
//         else {
//             geometryPoints[i].slope = (geometryPoints[i].Y - geometryPoints[maxXPointIdx].Y) / (geometryPoints[i].X - geometryPoints[maxXPointIdx].X);
//         }
//     }
//     geometryPoints.sort(function (a, b) {
//         if (a.slope < b.slope) {
//             return 1;
//         }
//         else {
//             return -1;
//         }
//     });
//     for (let i in geometryPoints) {
//         markerList[i] = [geometryPoints[i].X, geometryPoints[i].Y];
//     }
// };

export {
    stringToList,
    getStandardTime,
    getTTime,
    sortPoint,
    stringToSingleLocation,
}