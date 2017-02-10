const fs = require('fs');
const path = require('path');
const ageCheck = require('./age-check.js');
const YotiClient = require('yoti-node-sdk');
const request = require('request');
const QRCode = require('qrcode-svg');

const CLIENT_SDK_ID = '7dd705c6-4345-41b4-9713-0275fcd96506'
const PEM = fs.readFileSync(path.join(__dirname, "../keys/app.pem"));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);


const fileServer = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
};

const yotiCallback = {
  path: '/thankyou',
  method: 'GET',
  handler: (req, reply) => {
    console.log("THANKYOU");
    let token = req.query.token;
    if(!token) {
      reply.view('error', {
        error : "No token has been provided."
      });
      return;
    }
    let promise = yotiClient.getActivityDetails(token);
    promise.then((activityDetails) => {
      if(ageCheck(activityDetails.getUserProfile().dateOfBirth)) {
        reply.view('content-form');
      } else {
        reply.view('over-age');
      }
    }).catch((err) => {
      console.error(err);
      reply.view('error', {
        error : err
      });
      return;
    })
  }
};




qr = {
  path: '/qr',
  method: 'GET',
  handler: (req, reply) => {
    request.get(`https://www.yoti.com/qr/5be10ae7-af29-40b0-8d33-a0fb90cb0e88`, (e, response, body) => {
      // Get URL
      const url = body.match(/https:\/\/code\.yoti\.com\/.*\?/)[0].slice(0, -1);
      // Get proto
      const proto = body.match(/proto_.*=/)[0];
      console.log(proto);
      // Make SVG
      const svg = new QRCode({
        content: url,
        color: 'white',
        background: '#432668'
      }).svg();
      // Give to client
      reply(JSON.stringify({svg, proto, url}));
    });
  }
};

module.exports = [
  qr,
  fileServer,
  yotiCallback
]
