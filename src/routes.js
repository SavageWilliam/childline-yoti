const { ageConfirmationHandler, qrHandler } = require('./handlers');

const fileServer = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
}

const yotiCallback = {
  path: '/thankyou',
  method: 'GET',
  handler: ageConfirmationHandler
}

const qr = {
  path: '/qr',
  method: 'GET',
  handler: qrHandler
}

module.exports = [
  qr,
  fileServer,
  yotiCallback
]
