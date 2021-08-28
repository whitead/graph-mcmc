'use strict';
var cmaps = require('./mapCanvas');
var graphs = require('../lib/graphs');
var mcmc = require('../lib/MCMC.js');

function start(map) {
	let canvas = document.getElementById('map-canvas');
	let pcanvas = document.getElementById('prop-canvas');
	let g = graphs.map2graph(map);
	mcmc.mcmc(g, 300, 10000,
		(x) => map.measure(x, 0.8),
		(x) => graphs.nextGraph(x, 0.5),
		(g0, g1, i, p, mh, theta, accept, next) => {
			cmaps.drawGraph(canvas, map, g0);
			cmaps.drawGraph(pcanvas, map, g1);
			document.getElementById('step').textContent = i;
			document.getElementById('qij').textContent = p.qij.toFixed(3);
			document.getElementById('qji').textContent = p.qji.toFixed(3);
			document.getElementById('mh').textContent = mh.toFixed(3);
			document.getElementById('mh').textContent = mh.toFixed(3);
			document.getElementById('move').textContent = p.action;
			document.getElementById('theta').textContent = theta.toFixed(3);

			let T = Number(document.getElementById('trange').value);

			document.getElementById('temperature').textContent = T.toFixed(3);
			if (accept) {
				if (mh > 1)
					document.getElementById('accept').textContent = 'accept - better';
				else
					document.getElementById('accept').textContent = 'accept - random';
			} else {
				document.getElementById('accept').textContent = 'reject';
			}
			setTimeout(() => next(T), document.getElementById('slow').checked ? 750 : 50);
		});
}

function main() {
	let canvas = document.getElementById('map-canvas');
	let finish = cmaps.bind(canvas);
	document.getElementById('start').addEventListener('click', () => {

		document.getElementById('start').setAttribute('disabled', 'disabled');
		let map = finish();
		if (map !== null)
			start(map);
	});
}

document.onreadystatechange = function () {
	if (document.readyState === "interactive") {
		main();
	}
}
