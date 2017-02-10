
!function() {
    "use strict";
    var qrButton = document.querySelector('.get-qr-button'),
      qrcode = document.querySelector('.qr-code-output'),
      appId = '3392788e-e529-4309-8ed7-54d7ac554055';

    var getQR = function () {
      var o = new XMLHttpRequest();
      o.addEventListener('load', function (e) {
        var responseObj = JSON.parse(e.target.responseText);
        qrButton.style.display = 'none';
        qrcode.innerHTML = responseObj.svg;
        qrcode.style.textAlign = 'center';
        listenForToken(responseObj.proto, responseObj.url);
      });
      o.open('GET', '/qr');
      o.send();
    };

    var listenForToken= function(proto, url) {
      var host = 'wss://api.yoti.com/api/v1/connect-sessions/' + proto;
      var socket = new WebSocket(host);
      socket.onopen = function () {
        socket.send(JSON.stringify({subscription: proto}));
      };
      socket.onmessage = function (msg) {
        var data = JSON.parse(msg.data);
        switch (data.status) {
          case 'COMPLETED' : {
            //Callback URL (with token)
            window.location = 'thankyou?token=' + data.token;
          }
        }
      };
    };

    var t = {
      config: {
        service: "https://www.yoti.com/connect/",
        qr: "https://www.yoti.com/qr/"
      }
    },
    i = function(e) {
      t.serviceRedirectTimeout && clearTimeout(t.serviceRedirectTimeout);
      var n = Date.now(),
        r = 5e3;
      t.serviceRedirectTimeout = setTimeout(function() {
        var e = Date.now();
        r + 1e3 > e - (n + r) && (window.location = t.config.service + appId)
      }, r)
     },
    n = function(t) {
        /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) && i(t.currentTarget)
    },
    //Function only fires only in mobile
    o = function(e, i, n) {
     var r = 'https://www.yoti.com/qr/' + i,
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
        o = i || 'https://www.yoti.com/qr/5be10ae7-af29-40b0-8d33-a0fb90cb0e88'
      n.onreadystatechange = function() {
        n.readyState === XMLHttpRequest.DONE && 200 === n.status && s(n.response, r, i)
      }, n.open("GET", o, !0), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(null)
    }

    t.init = function(i) {
      for (var s in i) t.config.hasOwnProperty(s) && (t.config[s] = i[s]);
        var p = '5be10ae7-af29-40b0-8d33-a0fb90cb0e88',
          // g gets the href set in o function - this will fire off need to add event listener
          g = qrButton,
            // A = a(l.dataset.size),
          v = t.config.service + appId;
          var b;
          //HERE WE CHECK IF WE ARE ON A MOBILE OR NOT!
          /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) ? (b = "_self", o(g, p, !0)) : (v = "javascript:void(0)", n = getQR);

      g.setAttribute("href", t.config.service + appId),
      g.setAttribute("data-application-id", appId),
      g.setAttribute("data-scenario-id", p),
      console.log(g, 'THE BUTTON');
      g.addEventListener("click", n);

    }
    t.config.service = 'https://code.yoti.com/app/'
    t.init()
  }();
