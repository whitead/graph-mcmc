'use strict';
var expect = require('chai').expect; //assertion library
var graphs = require('../scripts/graphs.js');
var maps = require('../scripts/maps.js');

describe('graphs', function() {

    it('should be able to turn a map into a graph', function(done) {

	let m = new maps.Map();
	m.add([0,0]);
	let g = graphs.set2graph([], m);
	done();

    });

    it('should be able to get sum of edge weights', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);
	let s = g.edges().reduce( (sum, e) => {
	    return sum + m.edist(e);
	}, 0);
	expect(s).to.be.within(5.99, 6.01);	   
	done();
    });

    it('should be able to compute the measure of the graph', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([5,12]);
	let g = graphs.set2graph([[0,1], [0,2]], m);
	expect(m.measure(g, 2)).to.be.within( 2 * (5 + 13) + (5 + 13) - 0.01, 2 * (5 + 13) + (5 + 13) + 0.01);
	done();
    });

    it('should be able to return list of cuttable edges', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([0,0]);
	m.add([0,0]);
	let g = graphs.set2graph([[0,1], [0,2]], m);
	expect(graphs.bridges(g)).to.include([0,1]);

    });

});
