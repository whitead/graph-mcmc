'use strict';
var graphs = require('./graphs.js');

/*
* The Markov Chain Monte Carlo algorithm with exponential stationary. 
* 
* The way to interact with this method is with the callback function, which is called
* at each iteration. The callback takes in a next parameter, which when called will do
* the next iteration of the MCMC algorithm
*
* Args:
*    x0: Starting position
*    T: A scalar (temperature)
*    N: An integer for number of iterations
*    weight_fxn: Should take in the type of x0 and return a positive scalar
*    proposal_fxn: should take in an x0 and return an object with a x property (new x0), qij, qji
*    callback: a function which should accept x0, xp (proposed), i (iteration), proposal object, mh (prop success) and true/false (accepted move)
*    i: iteration number (default = 0)
*    theta0: last theta (default = null)
*
*/
function mcmc(x0, T, N, weight_fxn, proposal_fxn, callback, i =0, theta0 = null ) {

    if(i === N)
	return;

    if(theta0 === null)
	theta0 = weight_fxn(x0);
    let theta1, x1, prop;
    prop = proposal_fxn(x0);
    x1 = prop.x;
    theta1 = weight_fxn(x1);
    let mh = prop.qji / prop.qij * Math.exp( -(theta1 - theta0) / T);
    let accept = Math.random() < mh;
    
    callback(x0, x1, i, prop, mh, (accept ?  theta1 : theta0), accept, (newT=T) => {
	if(accept)
	    mcmc(x1, newT, N, weight_fxn, proposal_fxn, callback, i + 1, theta1);
	else
	    mcmc(x0, newT, N, weight_fxn, proposal_fxn, callback, i + 1, theta0);
    });
}

exports.mcmc = mcmc;
