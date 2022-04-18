
// проверяем расположение точки (слева от вектора, справа от вектора, или принадлежит вектору)
function classify(vector, x1, y1) {
    var pr = (vector.x2 - vector.x1) * (y1 - vector.y1) - (vector.y2 - vector.y1) * (x1 - vector.x1);
    if (pr > 0)
        return 1;
    if (pr < 0)
        return -1;
    return 0;
}
// классифицируем ребро (Касается, пересекает или безразлично)
function edgeType(vector, a) {
    switch (classify(vector, a.x, a.y)) {
        case 1:
            return ( (vector.y1 < a.y) && (a.y <= vector.y2) ) ? 1 : 2;
            break;
        case -1:
            return ((vector.y2 < a.y) && (a.y <= vector.y1)) ? 1 : 2;
            break;
        case 0:
            return 0;
            break;
    }
}

// основной алгоритм, который проверяет принадлежность точки к многоугольнику
function pointInPolygon() {
    parity = 0;
    for (var i = 0; i < pol.length - 1; i++) {
        v = {
            'x1': pol[i].x,
            'y1': pol[i].y,
            'x2': pol[i + 1].x,
            'y2': pol[i + 1].y
        }
        switch (edgeType(v, point)) {
            case 0:
                return 2;
                break;
            case 1:
                parity = 1 - parity;
                break;
        }
    }
    v = {
        'x1': pol[pol.length - 1].x,
        'y1': pol[pol.length - 1].y,
        'x2': pol[0].x,
        'y2': pol[0].y
    }
    switch (edgeType(v, point)) {
        case 0:
            return 2;
            break;
        case 1:
            parity = 1 - parity;
            break;
    }
    return parity;
}

function check() {
    var hit = false;
    point = {
        'x': getRandom(52.62832761, 52.64104717),
        'y': getRandom(83.48023111, 83.48433158)
    }

    var checkP = pointInPolygon();
    if(checkP == 0){
        //Точка лежит вне многоугольника;
    } else if(checkP == 1) {
        //Точка лежит в многоугольнике;
        hit = true;
    } else {
        //Точка лежит на грани многоугольника;
        hit = true;
    }
    return hit;
        
}


function check_point() {

}

/* функция возвращающая случайное число в диапазоне */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// запускается при загрузке страницы, подгружает канвас и создает многоугольник и точку по умолчанию
window.onload = function() {

    // координаты многоугольника
     pol = [{'x': 52.62832761, 'y':83.48207304},
     {'x': 52.62866762, 'y': 83.48171451},
     {'x': 52.63100795, 'y': 83.48073743},
     {'x': 52.6325608, 'y': 83.48069107},
     {'x': 52.63293951, 'y': 83.48084701},
     {'x': 52.63388142, 'y': 83.48054476},
     {'x': 52.63488318, 'y': 83.48121364 },
     {'x': 52.63793063, 'y': 83.48023111},
     {'x': 52.64104717, 'y': 83.48335088},
     {'x': 52.63628435, 'y': 83.48441511},
     {'x': 52.63585765, 'y': 83.48435158},
     {'x': 52.6353047, 'y': 83.48424243},
     {'x': 52.63256855, 'y': 83.48288096}
     ];

    point = {
        'x': getRandom(52.62832761, 52.64104717),
        'y': getRandom(83.48023111, 83.48433158)
    }
    
    
    // Отрисуем многоугольник
    var polygon = {
    x: [52.62832761, 52.62866762, 52.63100795, 52.63100795, 52.63293951, 52.63388142, 52.63488318, 52.63793063, 52.64104717, 52.63648435, 52.63585765, 52.6353047, 52.63256855, 52.62832761],
    y: [83.48207304, 83.48171451, 83.48073743, 83.48069107, 83.48084701, 83.48054476, 83.48121364, 83.48023111, 83.48335088, 83.48441511, 83.48437158, 83.48424243, 83.48288096, 83.48207304],
    type: 'scatter'
    };
    var xCheck = getRandom(52.62832761, 52.64104717);
    var yCheck = getRandom(83.48023111, 83.48433158);
    var sc = {
         x: [xCheck],
         y: [yCheck],
         mode: 'markers',
         type: 'scatter'
    };
    point = {
        'x': xCheck,
        'y': yCheck
    }

    var checkP = pointInPolygon();
    txtV3 = document.getElementById('text3');
    if(checkP == 0){
        txtV3.innerHTML='Точка лежит вне многоугольника';
        console.log(111);
    } else if(checkP == 1) {
        txtV3.innerHTML='Точка лежит в многоугольнике';
    } else {
        txtV3.innerHTML='Точка лежит на грани многоугольника';
    }
    var data = [polygon, sc];

    var layout = {
    xaxis: {
        autorange: true
        },
    yaxis: {
        autorange: true
        }
    };
    myGraph = document.getElementById('graph');
    Plotly.plot(myGraph, data, layout);


    txtV1 = document.getElementById('text1');
    txtV2 = document.getElementById('text2');
    var time = performance.now();
    var N = 100000;
    var hits = 0;
    var sHeight = 83.48433158-83.48023111;
    var sWidth = 52.64104717-52.62832761;
    for (var i = 0; i < N - 1; i++) {
        if (check() == true) {
            hits = hits + 1; 
        }
    }
    var sq = (sHeight*sWidth)*(hits/N);
    txtV1.innerHTML = 'Площадь полигона равна ' + (sq*10000*100).toFixed(5) + ' га';
    time = performance.now() - time;
    txtV2.innerHTML = 'Время выполнения расчета ' + (time*0.001).toFixed(5) + ' сек';

}

