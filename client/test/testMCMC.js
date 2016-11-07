'use strict';
var chai = require('chai');
var expect = chai.expect; //assertion library
var mcmc = require('../lib/MCMC.js');
var graphs = require('../lib/graphs.js');
var maps = require('../lib/maps.js');

describe('mcmc', function() {

    it('should call a function over graphs with weight', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);

	mcmc.mcmc(g, 1, 1, (x) => m.measure(x, 1), (x) => graphs.nextGraph(x), (x, xp, i, p, mh, theta, accept, next) => {
	    expect(x).to.be.ok;
	    expect(i).to.eql(0);
	    expect(mh).to.be.above(0);
	    done();
	});
	
    });
    
    it('should terminate', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);

	mcmc.mcmc(g, 10000, 2, (x) => m.measure(x, 1), (x) => graphs.nextGraph(x), (x, xp, i, p, mh, theta, accept, next) => {
	    return;
	});
	
	done();
    });
    
    it('should accept sometimes', function(done) {
	let m = new maps.Map();
	m.add([0,0]);
	m.add([3,4]);
	m.add([4,4]);
	let g = graphs.set2graph([[0,1], [1,2]], m);

	mcmc.mcmc(g, 10000, 100, (x) => m.measure(x, 1), (x) => graphs.nextGraph(x), (x, xp, i, p, mh, theta, accept, next) => {
	    if(accept)
		done();
	    else
		next();
	});	
    });

});
