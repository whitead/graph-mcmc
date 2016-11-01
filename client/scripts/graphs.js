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

function candidate_edge(g, disallowed=[], guess_existing=false) {
    
    let i, j;
    let timeout = 10;
    
    while(timeout > 0) {
	
	//try edge
	if(!guess_existing) {	    
	    i = Math.floor(g.nodeCount() * Math.random());
	    j = Math.floor(g.nodeCount() * Math.random());
	} else {
	    i = Math.floor(g.edgeCount() * Math.random());
	    j = Number(g.edges()[i].w);
	    i = Number(g.edges()[i].v);
	}
	
	if(i !== j) {
	    let valid = true;
	    for(let k = 0; k < disallowed.length; k++) {
		if((Number(disallowed[k][0]) === i && Number(disallowed[k][1]) === j) ||
		   (Number(disallowed[k][1]) === i && Number(disallowed[k][0]) === j)) {
		    valid = false;
		    break;
		}
	    }
	    if(valid)
		break;
	}

	timeout--;
    }

    if(timeout === 0)
	return null;

    return [i,j];
}

exports.nextGraph = function(g, padd=0.5) {

    //make new one
    let g2 = new glib.Graph({directed: false});
    g.nodes().forEach( (n) => {
	g2.setNode(n, g.node(n));
    });
    g.edges().forEach( (e) => {
	g2.setEdge(e.v, e.w)
    });

    let qij = 1;
    let qji = 1;
    let pdel = 1 - padd;
    let action = '';
    let e = null;

    //check for special cases
    let gbridges = bridges(g);
    if(gbridges.length === g.edgeCount()) {
	//forced add
	action = 'forced_';
	padd = 1;
    } else if(g.edgeCount() === g.nodeCount() * (g.nodeCount() - 1) / 2) {
	//forced delete
	pdel = 1;
	action = 'forced_';
    }

    if(pdel < 1 && Math.random() < padd) {
	//add
	action += 'add';
	let disallowed = [];
	g.edges().forEach( (e) => {
	    disallowed.push([e.v, e.w]);
	});
	e = candidate_edge(g, disallowed);	
	if(e !== null) {
	    qij *= padd * 1 / (  g.nodeCount() * (g.nodeCount() - 1) / 2 - g.edgeCount());
	    g2.setEdge(e[0], e[1]);
	    qji *= pdel * 1 / (g2.edgeCount() - bridges(g2).length);
	}
    } else {
	//delete
	action += 'delete'
	let disallowed = gbridges;	
	e = candidate_edge(g, disallowed, true);
	if(e !== null) {
	    qij *= pdel * 1 / (g.edgeCount() - disallowed.length);
	    g2.removeEdge(e[0], e[1]);
	    qji *= padd * 1 / (  g2.nodeCount() * (g2.nodeCount() - 1) / 2 - g2.edgeCount());
	}
    }

    if(e === null) {
	return null;
    }

    return {graph: g2, edge: e, action: action, qij: qij, qji: qji};
}

function bridges(g) {
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

exports.bridges = bridges;
