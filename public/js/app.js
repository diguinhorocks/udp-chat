$(document).ready(function(){
  $('#send').click(function(){
    socket.emit('send', $('#msg').val());
  });
});