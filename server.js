var dgram = require("dgram"); // incluindo modulo de datagrama (protocolo UDP)
var fs = require('fs');

//criando HTTP server
var http = require('http').createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile(
    __dirname + '/client.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    }
  );
})



//criando UDP server
var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
var udpnames = {};
var myuser = null;
var scope = "255.255.255.255";


server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.on("message", function (msg, rinfo) {
  
  var flag = msg.toString().substr(0, 1);

  if(flag == 'L') 
  {
    console.log('endereco do cara: '+rinfo.address);
    var ola = new Buffer('O' + msg.toString().substr(1));
    udpnames[msg.toString().substr(1)] = msg.toString().substr(1);

    client.send(ola, 0, ola.length, 9874, rinfo.address, function(err, bytes) {} )
    console.log('UDP LIST: '+JSON.stringify(udpnames));
  }

  if(flag == 'F') 
  {
    delete udpnames[msg.toString().substr(1)];
    console.log('UDP LIST: '+JSON.stringify(udpnames));
    var saiu = new Buffer('F' + msg.toString().substr(1));
    client.send(saiu, 0, saiu.length, 9874, "255.255.255.255", function(err, bytes) {} )
  }

  console.log("SERVER GOT: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});


server.bind(9874);

http.listen(8080);


// incluindo socket io para manipular eventos assincronos com o server
var io = require('socket.io').listen(http);

console.log('conectando HTTP server porta 8080');

var usernames = {};

io.sockets.on('connection', function (socket) {

  //evento de envio de msg para o servidor. servidor recebe, envia a msg para o cliente
  socket.on('send', function (data) {
    io.sockets.emit('receive', data, socket.username);
    var message = new Buffer(data);
    client.send(message, 0, message.length, 9874, "255.255.255.255", function(err, bytes){
      console.log('ERRO: '+ err);
    })
  });

  socket.on('sendusername', function(username){
    usernames[socket.id] = username;
    socket.username = username;
    io.sockets.emit('userlist', usernames);
    var message = new Buffer('L' + username);
    client.send(message, 0, message.length, 9874, "localhost", function(err, bytes){
      console.log('ERRO: '+ err);
    })
  })

  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.id];
    // update list of users in chat, client-side
    io.sockets.emit('userlist', usernames);

    var flag = new Buffer('F'+ socket.username);

    server.send(flag, 0, flag.length, 9874, "255.255.255.255", function(err, bytes){
      console.log('ERRO: '+ err);
    })
  });

});

