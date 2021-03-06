const fs = require('fs');
const path = require('path');
const ageCheck = require('./age-check.js');
const YotiClient = require('yoti-node-sdk');

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

module.exports = [
  fileServer,
  yotiCallback
]
