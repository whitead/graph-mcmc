'use strict';
var expect = require('chai').expect; //assertion library
var maps = require('../scripts/maps.js');

describe('maps', function() {

    it('should add & remember points', function(done) {
	let m = new maps.Map();
	m.add([323, 241], 'f');
        expect(m.point(0).p).to.eql([323, 241]);
        expect(m.point(0)).to.have.property('name', 'f');
        done();
    });
    
    it('should return distance between two points', function(done) {
	let m = new maps.Map();
	m.add([0,1], 'f');
	m.add([0,0],'fdsa');
	expect(m.dist(0,1)).to.be.within(0.99, 1.01);
	done();
    });
    
    it('should handle multiple dimensions', function(done) {
	let m = new maps.Map();
	m.add([0,0,0], 'f');
	m.add([0,3,4],'fdsa');
	expect(m.dist(0,1)).to.be.within(4.99, 5.01);
	done();
    });


});

