'use strict';

exports.Map = class Map {
/*
* Used to create initial distance matrix and nodes. Made up of xy labled points.
*/
    constructor() {
	this.points = Array();
	this.names = Array();
    }

    add(p, name='') {
	this.points.push(p);
	this.names.push(name);
    }

    point(i) {
	return {p: this.points[i], name: this.names[i]};
    }

    dist(i, j) {
	var dist = 0;
	this.points[i].forEach((pi, k) => {
	    dist += Math.pow(this.points[j][k] - pi, 2);
	});
	return Math.sqrt(dist);
    }
}

