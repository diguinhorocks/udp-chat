var dgram = require("dgram"); // incluindo modulo de datagrama (protocolo UDP)
var fs = require('fs');


//criando HTTP server
var http = require('http').createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(
        __dirname + '/client.html',
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

//criando UDP server

var server = dgram.createSocket("udp4");
var updnames = {};

server.on("message", function (msg, rinfo) {
  udpnames[msg] = msg;

  if(msg == 'L' + msg) {
    var ola = new Buffer('O' + msg);
    server.send(ola, 0, ola.length, 9874, rinfo.address, function(err, bytes){

    })
  }
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(9874);



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
    var message = new Buffer(data);
    server.send(message, 0, message.length, 9874, "255.255.255.255", function(err, bytes){

    })
  });

  socket.on('sendusername', function(username){
    usernames[socket.id] = username;
    socket.username = username;
    io.sockets.emit('userlist', usernames);
    var message = new Buffer(username);
    server.send(message, 0, message.length, 9874, "localhost", function(err, bytes){

    })
  })

  socket.on('disconnect', function(){
      // remove the username from global usernames list
      delete usernames[socket.id];
      // update list of users in chat, client-side
      io.sockets.emit('userlist', usernames);

  });


});

