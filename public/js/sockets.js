var socket = io.connect('http://127.0.0.1:8080');

socket.on('connect', function(){
  var username = prompt('Insira seu nickname');

  socket.emit('sendusername', username);
})

socket.on('receive', function(data, username){
  $('.text').append('<p>'+ username +': '+ data +'</p>');
})

socket.on('userlist', function(list){
  $('.users').empty();

  $.each(list, function(i, user){
    $('.users').append('<a href="#">' + user + '</a>');
  })
})