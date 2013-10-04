var parent = module.parent.exports
  , http = require('http')
  , dgram = require('dgram')
  , fs = require('fs')
  , udpserver = dgram.createSocket('udp4')

//criando HTTP server
exports.server = http.createServer(parent.app).listen(8080, function() {
  console.log('conectando HTTP server porta 8080');
})

// criando udp server
exports.udp = udpserver.on("listening", function () {
  var address = udpserver.address();
  console.log("server listening " + address.address + ":" + address.port);
}).bind(9874);

console.log('conectando UDP server porta 9874')

udpserver.on("message", function (msg, rinfo) {
  // more stuff here 
});