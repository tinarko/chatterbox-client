

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
  $('#chats').on('click', '.username', app.handleUsernameClick);
  $('#send').on('submit', app.handleSubmit);
  $('#roomSelect').on('change', app.renderRoom);
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
    data: { order: 'createdAt' },
    contentType: 'application/json',
    success: function (data) {
      var messages = data.results;
      for (var i = 0; i < messages.length; i++) {
        app.renderMessage(messages[i]);
      }
     
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
  var $post = $('<div class="chat"></div>');

  if (!message.roomname) {
    message.roomname = 'lobby';
  }

  var $username = '<div class="username">' + message.username + '</div>';

  if (app.friends[message.username] === true) {
    $username.addClass('friend');
  }
  $post.append($username);

  var $message = '<span>' + message.text + '</span>';
  $post.append($message);
  
    //$message = $('<span>' + message[i].text + '</span><br /></div>');  

    //$post.append($message);
  $chats.append($post);
};

// Allow users to create rooms and enter existing rooms - 
// Rooms are defined by the .roomname property of messages, 
// so you'll need to filter them somehow.

app.renderRoom = function (room) {
  var roomname = prompt('What room would you like to add?');
  if (roomname) {
    app.roomname = roomname;
    $roomSelect.append('<option value=' + roomname + '>' + roomname + '</option>');
    
  }
  var $roomSelect = $('#roomSelect');
  console.log('renderRoom ran');
};

app.handleUsernameClick = function (event) {
  // if clicked, traverse dom to find clicked class
  // $('#chats').on('click', 'username')
  
  var friend = $(this).text();
  // console.log($(this).username);
  // add friend to clicked class
  if (friend !== undefined) {
    app.friends[friend] = !app.friends[friend];  
  }

  // var selector = '[data-username"' + username.replace(/"/g, '\\\"') + '"]';
  $('.username').each(function () {
    if (this.innerText === friend) {
      $(this).toggleClass('friend');
      $(this).siblings().css('font-weight', 'bold');
    }
  });
 
};

app.handleSubmit = function (event) {
  console.log('handleSubmit ran');
  var $message = $('#message');
  var message = {
    username: app.username,
    text: $message.val(),
    roomname: app.roomname
  };
  app.send(message);

  event.preventDefault();
};













