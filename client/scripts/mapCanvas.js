'use strict';
var maps = require('../lib/maps');

function drawPoint(canvas, point) {
    let ctx = canvas.getContext('2d');
    ctx.moveTo(point.x, point.y);
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
    ctx.fill();
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/*
* Will add edit functionality to canvas. Returns a callable
* function. If that is called, the canvas will be longer be editable
* and the function will return a map.
*/

exports.bind = function(canvas) { 
    let ctx = canvas.getContext('2d');
    let map = new maps.Map();

    function l(evt) {
	let p = getMousePos(canvas, evt);
	if(map.points.length === 0)
	    ctx.fillStyle = 'red';
	else
	    ctx.fillStyle = 'gray';
	drawPoint(canvas, p);
	map.add([p.x, p.y]);
	let s = document.getElementById('start')
	if(s && map.points.length > 2) {
	    s.removeAttribute('disabled');
	}

    }
    
    canvas.addEventListener('click', l);
    var finished = false;

    return () => {
	if(finished)
	    return null;
	else
	    finished = true;
	canvas.removeEventListener('click', l);
	return map;
    }
}

/*
* Will render the given graph and map onto the canvas
*/
exports.drawGraph = function(canvas, map, g) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    g.edges().forEach( (e) => {
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = 1.0;
	ctx.beginPath();
	ctx.moveTo(map.points[e.v][0], map.points[e.v][1]);
	ctx.lineTo(map.points[e.w][0], map.points[e.w][1]);
	ctx.stroke();
    });
    if('bridges' in g) {
	g.bridges.forEach( (e) => {
	    ctx.strokeStyle = 'blue';
	    ctx.lineWidth = 1.5;
	    ctx.beginPath();
	    ctx.moveTo(map.points[e[0]][0], map.points[e[0]][1]);
	    ctx.lineTo(map.points[e[1]][0], map.points[e[1]][1]);
	    ctx.stroke();
	});
    }

    map.points.forEach( (p, i) => {
	if(i === 0)
	    ctx.fillStyle = 'red';
	else
	    ctx.fillStyle = 'gray';
	ctx.moveTo(p[0], p[1]);
	ctx.beginPath();
	ctx.arc(p[0], p[1], 10, 0, 2 * Math.PI);
	ctx.fill();

    });


}
