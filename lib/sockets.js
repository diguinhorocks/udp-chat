var parent = module.parent.exports 
  , app = parent.app
  , server = parent.server
  , sio = require('socket.io')
  , udpnames = {}
  , usernames = {}

var io = sio.listen(server);

io.sockets.on('connection', function (socket) {

  //evento de envio de msg para o servidor. servidor recebe, envia a msg para o cliente
  socket.on('send', function (data) {
    io.sockets.emit('receive', data, socket.username);
  })

  socket.on('sendusername', function(username){
    usernames[socket.id] = username;
    udpnames[username] = username;
    socket.username = username;
    io.sockets.emit('userlist', usernames);
    
  })

  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.id];
    // update list of users in chat, client-side
    io.sockets.emit('userlist', usernames);
  })

});