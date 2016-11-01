'use strict';
var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect; //assertion library
var graphs = require('../scripts/graphs.js');
var maps = require('../scripts/maps.js');

describe('graphs', function() {

    it('should turn a map into a graph', function(done) {

	let m = new maps.Map();
	m.add([0,0]);
	let g = graphs.set2graph([], m);
	done();

    });

    it('should get sum of edge weights', function(done) {
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

    it('should compute the measure of the graph', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([5,12]);
	let g = graphs.set2graph([[0,1], [0,2]], m);
	expect(m.measure(g, 2)).to.be.within( 2 * (5 + 13) + (5 + 13) - 0.01, 2 * (5 + 13) + (5 + 13) + 0.01);
	done();
    });

    it('should return list of cuttable edges', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([0,0]);
	m.add([0,0]);
	let g = graphs.set2graph([[0,1], [0,2]], m);
	let b = graphs.bridges(g);
	expect(b).to.deep.include.something.that.deep.equals([0,1]);
	done();
    });

    
    it('should return empty list when no cuttable edges', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([0,0]);
	m.add([0,0]);
	let g = graphs.set2graph([[0,1], [1,2], [0,2]], m);
	let b = graphs.bridges(g);
	expect(b.length).to.equal(0);
	done();
    });

    
    it('should return list of cuttable edges in complex graph', function(done) {

	/*
	 *  0 --- 1
	 *   \   /
	 *     2
	 *     |
	 *     3
	 *     |
	 *     4
	 *   /   \
	 *  5 --- 6
	 *
	 * bridges: [2,3], [3,4]
	 */
	
	let m = new maps.Map();
	for(let i = 0; i < 7; i++)
	    m.add([0,0]);
	
	let edges = [ [0,1],
		      [0,2],
		      [1,2],
		      [2,3],
		      [3,4],
		      [4,5],
		      [4,6],
		      [5,6] ];
	
	let g = graphs.set2graph(edges, m);
	let b = graphs.bridges(g);
	console.log(b);
	
	expect(b.length).to.equal(2);
	expect(b).to.deep.include.something.that.deep.equals([2,3]);
	expect(b).to.deep.include.something.that.deep.equals([3,4]);
	done();
    });

    it('should propose new graph with prob', function(done) {
	
    });
});
