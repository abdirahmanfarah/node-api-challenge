const express = require('express');

// Routers

// Server definition 
 const server = express();

 //Parse Json from the body
 server.use(express.json());

 server.get('/', (req, res) => {
   res.send(`<h1> Server up and running! </h1>`)
 });

module.exports = server;