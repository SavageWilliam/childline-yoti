const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const YotiClient = require('yoti-node-sdk');
const fs = require('fs');
const path = require('path');
// const env = require('env2')('./api-keys.env');

const CLIENT_SDK_ID = '88d412c3-280c-4eef-965b-f64ebacae1a4'
const PEM = fs.readFileSync(path.join(__dirname, "../keys/app.pem"));
var yotiClient = new YotiClient(CLIENT_SDK_ID, PEM)
const server = new Hapi.Server();

var tls = {
  key: fs.readFileSync(path.join(__dirname, '../keys/server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/server-cert.pem'))
};

const port = process.env.PORT || 4000;

server.connection({port: port, tls: tls });
