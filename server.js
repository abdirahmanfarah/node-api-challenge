const express = require('express');

// Routers

const projectRouter = require('./projects/projectRouter.js');

const actionRouter = require('./actions/actionRouter.js')

// Server definition 
 const server = express();

 //Parse Json from the body
 server.use(express.json());

 server.use('/api/projects', projectRouter, actionRouter);

 server.use('/api/projects/:id/actions', actionRouter);

 server.get('/', (req, res) => {
   res.send(`<h1> Server up and running! </h1>`)
 });

module.exports = server;