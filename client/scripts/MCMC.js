'use strict';
var graphs = require('./graphs.js');

/*
* The Markov Chain Monte Carlo algorithm with exponential stationary. 
* 
* The way to interact with this method is with the callback function, which is called
* at each iteration. Use the callback to also delay iterations if necessary.
*
* Args:
*    x0: Starting position
*    T: A scalar (temperature)
*    N: An integer for number of iterations
*    weight_fxn: Should take in the type of x0 and return a positive scalar
*    proposal_fxn: should take in an x0 and return an object with a x property (new x0), qij, qji
*    callback: a function which should accept x0, i (iteration), weight (theta), and true/false (accepted move)
* 
*
*/
exports.mcmc = function(x0, T, N, weight_fxn, proposal_fxn, callback) {
    let theta0 = weight_fxn(x0);
    let theta1, x1, prop;
    for(let i = 0; i < N; i++) {

	prop = proposal_fxn(x0);
	x1 = prop.x;
	theta1 = weight_fxn(x1);
	
	if(Math.random() < prop.qji / prop.qij * Math.exp( (theta1 - theta0) / T)) {
	    theta0 = theta1;
	    x0 = x1;
	}

	//x0 !=== x1 -> accepted move or not
	callback(x0, i, theta0, x0 !== x1);
    }
    
}
