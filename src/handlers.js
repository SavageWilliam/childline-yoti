const fs = require('fs');
const path = require('path');
const request = require('request');
const YotiClient = require('yoti-node-sdk');
const QRCode = require('qrcode-svg');
const ageCheck = require('./age-check.js');

const PEM = fs.readFileSync(path.join(__dirname, "../keys/app.pem"));
const CLIENT_SDK_ID = '7dd705c6-4345-41b4-9713-0275fcd96506';
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

const qrHandler = (req, reply) => {
  request.get(`https://www.yoti.com/qr/5be10ae7-af29-40b0-8d33-a0fb90cb0e88`, (e, response, body) => {
    const url = body.match(/https:\/\/code\.yoti\.com\/.*\?/)[0].slice(0, -1);
    const proto = body.match(/proto_.*=/)[0];
    const svg = new QRCode({
      content: url,
      color: '#CCECF5',
      background: 'rgba(35, 79, 98, 1)'
    }).svg();
    reply(JSON.stringify({svg, proto, url}));
  });
}

const ageConfirmationHandler = (req, reply) => {
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
};

module.exports = {
  ageConfirmationHandler,
  qrHandler
}
