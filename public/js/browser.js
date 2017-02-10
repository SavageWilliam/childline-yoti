// Button to generate QRCode
var qrButton = document.querySelector('.get-qr-button');
// QR Code container element
var qrcode = document.querySelector('.qr-code-output');
// Profile name element

// 1. On click, call route to get QRCode svg
var getQR = function () {
  var o = new XMLHttpRequest();
  o.addEventListener('load', function (e) {
    var responseObj = JSON.parse(e.target.responseText);
    qrButton.style.display = 'none';
    qrcode.innerHTML = responseObj.svg;
    listenForToken(responseObj.proto, responseObj.url);
  });
  o.open('GET', '/qr');
  o.send();
};

// 2. After SVG received, set up WebSocket with YOTI to handle response
function listenForToken (proto, url) {
  var host = 'wss://api.yoti.com/api/v1/connect-sessions/' + proto;
  var socket = new WebSocket(host);
  socket.onopen = function () {
    socket.send(JSON.stringify({subscription: proto}));
  };
  // Get Token
  socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.status) {
      case 'COMPLETED' : {
        window.location = 'thankyou?token=' + data.token;
      }
    }
  };
}

!function() {
    "use strict";
    var t = {
            config: {
                service: "https://www.yoti.com/connect/",
                qr: "https://www.yoti.com/qr/",
                fontCDN: "https://fonts.googleapis.com/css?family=Roboto"
            }
        },
        e = function(t) {
            var e = document.getElementById("yoti-button-generator-js"),
                i = (e ? e.getAttribute("src") : "https://cdn.yoti.com/button-generator.js", document.createElement("link"));
            i.setAttribute("href", t),
            i.setAttribute("rel", "stylesheet"),
            i.setAttribute("type", "text/css"),
            document.body.appendChild(i)
        },
        i = function(e) {
            var i = e.getAttribute("data-application-id");
            t.serviceRedirectTimeout && clearTimeout(t.serviceRedirectTimeout);
            var n = Date.now(),
                r = 5e3;
            t.serviceRedirectTimeout = setTimeout(function() {
                var e = Date.now();
                r + 1e3 > e - (n + r) && (window.location = t.config.service + i)
            }, r)
         },
        n = function(t) {
            console.log('CLICKED ON MOBILE');
            /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) && i(t.currentTarget)
        },

        o = function(e, i, n) {
          console.log('RECOGNISED MOBILE');
           var r = t.config.qr + i,
               o = new XMLHttpRequest;
           o.onreadystatechange = function() {
               if (o.readyState === XMLHttpRequest.DONE && 200 === o.status) {
                   var t = JSON.parse(o.responseText);
                   e.href = t.qrCodeUrl + "?callback=" + t.callbackUrl + "&id=" + t.application.id + "&mobile=" + JSON.stringify(!!n)
               }
           }, o.open("GET", r, !0),
           o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
           o.setRequestHeader("content-type", "application/json"),
           o.send(null)
       },
        r = function(e, i) {
            e.preventDefault();
            var n = new XMLHttpRequest,
                r = e.currentTarget,
                o = i || t.config.qr + r.getAttribute("data-scenario-id");
            n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && 200 === n.status && s(n.response, r, i)
            }, n.open("GET", o, !0), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(null)
        }

    t.init = function(i) {
        for (var s in i) t.config.hasOwnProperty(s) && (t.config[s] = i[s]);
        e(t.config.fontCDN);
            var u = '3392788e-e529-4309-8ed7-54d7ac554055',
            p = '5be10ae7-af29-40b0-8d33-a0fb90cb0e88',
            // g gets the href set in o function - this will fire off need to add event listener
            g = qrButton,
              // A = a(l.dataset.size),
            v = t.config.service + u;
            //HERE WE CHECK IF WE ARE ON A MOBILE OR NOT!
            /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) ? (b = "_self", o(g, p, !0)) : (v = "javascript:void(0)", n = getQR);

          g.setAttribute("href", t.config.service + u),
          g.setAttribute("data-application-id", u),
          g.setAttribute("data-scenario-id", p),
          console.log(g, 'THE BUTTON');
          g.addEventListener("click", n);



    }
    t.config.service = 'https://code.yoti.com/app/'
    t.init()
    // window._ybg = t;



  }();



  //   function getProfile (token) {
  //   var o = new XMLHttpRequest();
  //   o.addEventListener('load', function (e) {
  //     qrcode.style.display = 'none';
  //     var profile = JSON.parse(e.target.responseText);
  //     profilename.innerHTML = 'Name: ' + profile.givenNames;
  //     profileimg.src = profile.selfie;
  //   });
  //   o.open('GET', '/profile?token=' + token);
  //   o.send();
  // }
