'use strict';
var chai = require('chai');
var expect = chai.expect; //assertion library
var mcmc = require('../scripts/MCMC.js');
var graphs = require('../scripts/graphs.js');
var maps = require('../scripts/maps.js');

describe('mcmc', function() {

    it('should call a function over graphs with weight', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);

	mcmc.mcmc(g, 1, 1, (x) => m.measure(x, 1), (x) => graphs.nextGraph(x), (x, i, theta, accept) => {
	    expect(x).to.be.ok;
	    expect(i).to.eql(0);
	    expect(theta).to.be.above(0);
	    done();
	});

    });

    it('should accept sometimes', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);

	mcmc.mcmc(g, 10000, 1, (x) => m.measure(x, 1), (x) => graphs.nextGraph(x), (x, i, theta, accept) => {
	    expect(accept).to.be.true;
	    done();
	});	
    });

});
