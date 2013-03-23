var dgram = require("dgram"); // incluindo modulo de datagrama (protocolo UDP)
var fs = require('fs');


//criando HTTP server
var http = require('http').createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(
        __dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );

})

http.listen(8080);

// incluindo socket io para manipular eventos assincronos com o server
var io = require('socket.io').listen(http); 

console.log('conectando HTTP server porta 8080');

var usernames = {};

io.sockets.on('connection', function (socket) {
  //servidor conectou com o cliente, envia uma msg de boas vindas
  socket.emit('news', { hello: 'world' });

  //evento de envio de msg para o servidor. servidor recebe, envia a msg para o cliente
  socket.on('send', function (data) {
    io.sockets.emit('receive', data, socket.username);
  });  

  socket.on('sendusername', function(username){
    usernames[socket.id] = username;
    socket.username = username; 
  })

});

//criando UDP server

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(41234);