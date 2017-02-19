

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: 'person',
  roomname: 'lobby',
  lastMessageid: 0,
  friends: {},
  messages: []
};

app.init = function () {
  app.username = window.location.search.substr(10);
  $('#main').find('.username').on('click', app.handleUsernameClick);
  $('#send').on('submit', app.handleSubmit);
  $('form').submit(function(event) {
    
  });

  app.fetch();
  
  var set;
  // var roomForm = ?????
  $('#addRoom').on('submit', app.renderRoom);
  //somehow append to #addRoom
  // $('#addRoom').onclick(app.renderRoom(prompt('What room would you like to add?')));
  $('clearbutton').on('click', app.clearMessages(set));
};


app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      app.fetch();
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: function (data) {
      app.renderMessage(data.results);
      set = data.results;
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });

};

app.clearMessages = function (message) {
  $('#chats').empty(message);
};

app.renderMessage = function (message) {
  var $chats = $('#chats');
  var $post = $('<div id="post"</div>');

  if (!message.roomname) {
    message.roomname = 'lobby';
  }

  var $username, $message;

  for (var i = 0; i < message.length; i++) {
    $username = $('<span class="username">' + message[i].username + '</span>');
    $message = $('<br /><span>' + message[i].text + '</span><br />');  
    $post.append($username);
    $post.append($message);
    $chats.append($post);
  }
};

// Allow users to create rooms and enter existing rooms - 
// Rooms are defined by the .roomname property of messages, 
// so you'll need to filter them somehow.

app.renderRoom = function (room) {
  var roomname = prompt('What room would you like to add?');
  var $roomSelect = $('#roomSelect');
  $roomSelect.append('<option value=' + roomname + '>' + roomname + '</option>');
  console.log('renderRoom ran');
};


app.handleUsernameClick = function () {
  // if clicked, traverse dom to find clicked class

  // add friend to clicked class
};

app.handleSubmit = function (event) {
  console.log('handleSubmit ran');
  var $message = $('#message');
  var message = {
    username: app.username,
    text: $message.val(),
    roomname: app.roomname
  };
  console.log(message);
  app.send(message);

  event.preventDefault();
};













