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
    //http://stackoverflow.com/questions/11218746/bridges-in-a-connected-graph/11221469#11221469

    var data = {low: Array(), pre: Array(), cnt: 0, bridges: Array()};
    g.nodes().forEach( () => {
	data.low.push(-1);
	data.pre.push(-1);
    });   
    bridge_dfs(g, 0, 0, data) //only have to call from first node, since we only consider connected
    return data.bridges;
}

function bridge_dfs(g, u, v, data) {
    data.pre[v] = data.cnt;
    data.low[v] = data.cnt++;
    g.nodeEdges(v).forEach(function(e) {
	let w = Number(e.w);
	if(w === v)
	    w = Number(e.v);	
	if(data.pre[w] === -1) {
	    bridge_dfs(g, v, w, data);
	    data.low[v] = Math.min(data.low[v], data.low[w]);
	    if(data.low[w] === data.pre[w]) {
		data.bridges.push([v, w]);		
	    }
	} else if(w !== u) { //w is an existing one and not u, pop up stack    
	    data.low[v] = Math.min(data.low[v], data.pre[w]);
	}
    });
    
}

exports.bridge_dfs = bridge_dfs;

