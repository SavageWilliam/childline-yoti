const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const routes = require('./routes.js');

const server = new Hapi.Server();

const tls = {
  key: fs.readFileSync(path.join(__dirname, '../keys/server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/server-cert.pem'))
};

const port = process.env.PORT || 4000;

server.connection({port: port, tls: tls });

server.register([Inert, Vision], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
  });

  server.route(routes);

});

module.exports = server;
