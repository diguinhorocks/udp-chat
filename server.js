var app = exports.app = require('express')()
  , express = require('express')
  , http = require('http')
  , dgram = require('dgram')
  , fs = require('fs')
  , udpserver = dgram.createSocket('udp4')
  , client = dgram.createSocket('udp4')

app.configure(function(){
  //setando o path das views
  app.set('views', __dirname + 'views');
  //setando o path dos assets
  app.use(express.static(__dirname + '/public'));
  //definição das routes
  app.use(app.router);
})

/*
* app routes
*/
require('./routes');

//criando HTTP server
exports.server = http.createServer(app).listen(8080, function() {
  console.log('conectando HTTP server porta 8080');
})

udpserver.on("listening", function () {
  var address = udpserver.address();
  console.log("server listening " +
      address.address + ":" + address.port);
})

udpserver.on("message", function (msg, rinfo) {
  // more stuff here 
});

// starting
udpserver.bind(9874)
console.log('conectando UDP server porta 9874')


// incluindo socket io para manipular eventos assincronos com o server
require('./sockets')
