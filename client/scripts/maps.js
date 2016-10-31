'use strict';
var glib = require("graphlib");

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
	let dist = 0;
	this.points[i].forEach((pi, k) => {
	    dist += Math.pow(this.points[j][k] - pi, 2);
	    
	});
	return Math.sqrt(dist);
    }

    edist(e) {
	return this.dist(e.v, e.w);
    }

    dist_sum(g) {
	return g.edges().reduce( (sum, e) => {
	    return sum + this.edist(e);
	}, 0);
    }

    measure(g, r=1) {
	let paths = glib.alg.dijkstra(g, 0, (e) => {return this.edist(e)});
	let p = Object.keys(paths).reduce( (sum, k) => {	    
	    return sum + paths[k].distance;
	}, 0);
	return r * this.dist_sum(g) + p;		      
    }

}

