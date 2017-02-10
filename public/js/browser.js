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
            /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) && i(t.currentTarget)
        }
        // r = function(e, i) {
        //     e.preventDefault();
        //     var n = new XMLHttpRequest,
        //         r = e.currentTarget,
        //         o = i || t.config.qr + r.getAttribute("data-scenario-id");
        //     n.onreadystatechange = function() {
        //         n.readyState === XMLHttpRequest.DONE && 200 === n.status && s(n.response, r, i)
        //     }, n.open("GET", o, !0), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(null)
        // },
        // o = function(e, i, n) {
        //     var r = t.config.qr + i,
        //         o = new XMLHttpRequest;
        //     o.onreadystatechange = function() {
        //         if (o.readyState === XMLHttpRequest.DONE && 200 === o.status) {
        //             var t = JSON.parse(o.responseText);
        //             e.href = t.qrCodeUrl + "?callback=" + t.callbackUrl + "&id=" + t.application.id + "&mobile=" + JSON.stringify(!!n)
        //         }
        //     }, o.open("GET", r, !0),
        //     o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        //     o.setRequestHeader("content-type", "application/json"),
        //     o.send(null)
        // },
        // a = function(t) {
        //     var e = {
        //         css: "display:inline-block; background:#2e9ffe no-repeat left center; color:white;  text-decoration:none;   font-family: 'Roboto','Helvetica', sans-serif;                -webkit-border-radius: 3px;  -moz-border-radius: 3px; border-radius: 3px;            ",
        //         imgCss: "vertical-align:middle;"
        //     };
        //     return "small" === t ? (e.css += "font-size:14px; padding:5px 7px;",
        //     e.imgCss += "width:18px; padding-right: 6px;") : (e.css += "font-size:18px; padding:7px 9px;",
        //     e.imgCss += "width:28px; padding-right: 10px;"),
        //     e
        // },
        // s = function(t, e, i) {
        //     var n = t.split("<!--split-->")[0] + "</div>",
        //         r = t.split("<!--split-->")[1].split("<script>")[1].split("</script>")[0];
        //     if (i) {
        //         document.getElementById("inline-qr-div").innerHTML = n;
        //         var o = document.createElement("script");
        //         o.setAttribute("id", "inline-qr-script"), o.innerHTML = r, document.querySelector("body").appendChild(o)
        //     } else {
        //         var a = document.createElement("div"),
        //             o = document.createElement("script");
        //         a.setAttribute("id", "inline-qr-div"), o.setAttribute("id", "inline-qr-script"), a.innerHTML = n, o.innerHTML = r, document.getElementById('qrcodecontainer').appendChild(a), document.getElementById("qrcodecontainer").appendChild(o)
        //     }
    //     // };
    // t.renderTimeoutButton = function(t) {
    //     var e = document.getElementsByClassName("qr-code")[0],
    //         i = !1,
    //         n = document.getElementById("inline-qr-script");
    //     n.parentNode.removeChild(n);
    //     var o = document.createElement("a");
    //     o.setAttribute("href", "#"),
    //     o.setAttribute("style", "position: absolute; background-color: rgba(52,156,244,0.96); top: 50%; left: 50%; color: white; cursor: pointer; transform: translate(-50%, -50%); height:90% width: 90%;"),
    //     o.innerHTML = '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);background: url(https://www.yoti.com/dist/css/svg/sprite.css-05b3de2c.svg) 0 84.84848484848484% no-repeat; width: 32px; height: 35px;"></span>',
    //     e.appendChild(o),
    //     o.addEventListener("click", function(e) {
    //         e.preventDefault(), i || (r(e, t), i = !0)
    //     })
    // },
    t.init = function(i) {
        for (var s in i) t.config.hasOwnProperty(s) && (t.config[s] = i[s]);
        e(t.config.fontCDN);
        for (var c = document.querySelectorAll("*[data-yoti-application-id],*[data-yoti-scenario-id]"), d = 0; d < c.length; d++) {
          var l = c.item(d),
            u = l.getAttribute("data-yoti-application-id"),
            p = l.getAttribute("data-yoti-scenario-id"),
            b = l.getAttribute("data-yoti-type"),
            g = document.createElement("a"),
            m = document.createElement("img"),
            A = a(l.dataset.size),
            v = t.config.service + u;
            /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) ? (b = "_self", o(g, p, !0)) : (v = "javascript:void(0)", n = r);
        }
    }, window._ybg = t;
  }();
    // Button to generate QRCode
    var qrbutton = document.querySelector('.get-qr-button');
    // QR Code container element
    var qrcode = document.querySelector('.qr-code-output');
    // Profile name element

    // 1. On click, call route to get QRCode svg
    qrbutton.addEventListener('click', function () {
      var o = new XMLHttpRequest();
      o.addEventListener('load', function (e) {
        var responseObj = JSON.parse(e.target.responseText);
        qrbutton.style.display = 'none';
        qrcode.innerHTML = responseObj.svg;
        listenForToken(responseObj.proto, responseObj.url);
      });
      o.open('GET', '/qr');
      o.send();
    });

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
