[![Build Status](https://travis-ci.org/whitead/graph-mcmc.svg?branch=master)](https://travis-ci.org/whitead/graph-mcmc)
[![Coverage Status](https://coveralls.io/repos/github/whitead/graph-mcmc/badge.svg?branch=master)](https://coveralls.io/github/whitead/graph-mcmc?branch=master)


Graph MCMC
====

This is a simple Markov Chain Monte Carlo simulator. It explores
undirected connected graphs via an MCMC algorithm. The most
interesting aspect is its ability to correctly account for asymmetric
moves when near minimum spanning trees.

Graphs are random exponential with a weighting equation of
`exp(-w/T)`, where `w = r esum + pathsum` and T is a constant. `r` is
a constant and `esum` is the sum of all weighted undirected
edges. `pathsum` is the sum of all shortest paths to node 0. This
equation should tend towards graphs with a small number of paths
leading to node 0.

Demo
====

See demo at [whitelab.org/Apps/GraphMC](http://thewhitelab.org/Apps/GraphMC).

Develop
====

To install locally:

```
npm install && grunt
```

This will install the needed npm packages and run the unit tests.

