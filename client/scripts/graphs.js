'use strict';
var glib = require("graphlib");

exports.set2graph = function(edge_set, map) {
    let g = new glib.Graph({directed: false});
    map.points.forEach( (p, i) => {
	g.setNode(i, p.name);
    });
    edge_set.forEach((e) => {
	g.setEdge(e[0], e[1]);
    });

    return g;
}

exports.bridges = function(g) {
    
    return [];
}
