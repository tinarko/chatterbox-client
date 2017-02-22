

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
  $('#roomSelect').on('change', app.renderRoomChange);
  // $('form').submit(function(event) {});

  app.fetch();
  
  var set;
  // var roomForm = ?????
  $('#addRoom').on('submit', app.renderRoom);
  //somehow append to #addRoom
  // $('#addRoom').onclick(app.renderRoom(prompt('What room would you like to add?')));
  $('clearbutton').on('click', app.clearMessages(set));


  // setInterval(function() {
  //   app.fetch(true);
  // }, 10000);
  
};

app.send = function (message) {
  $message = $('#message');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      $message.val('');
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
      console.dir(data);
      var messages = data.results;
      for (var i = 0; i < messages.length; i++) {
        app.renderMessage(messages[i]);
      }
      app.messages = data.results;


      var newMessage = data.results[data.results.length - 1];
      if (newMessage.objectId !== app.lastMessageid) {
        app.lastMessageid = newMessage.objectId;
        app.renderRoomList(app.messages);
        app.renderMessages(app.messages);
        
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

app.renderMessages = function(messages) {
  app.clearMessages();
  
  if (Array.isArray(messages)) {
    messages.filter(function(message) {
      return message.roomname === app.roomname || (app.roomname === 'lobby' && !message.roomname);
    }).forEach(app.renderMessage);
  }
};

app.renderRoomList = function(messages) { 
  var $roomSelect = $('#roomSelect');
  $roomSelect.html('<option value="newRoom">New room...</option>');
  if (messages) {
    var rooms = {};
    messages.forEach( function(message) {
      var roomname = '<option>' + message.roomname + '</option>';
      if (roomname && !rooms[roomname]) {
        app.renderRoom(roomname);
        rooms[roomname] = true;
      }

    }); 
  }
  $roomSelect.val(app.roomname);
};

app.renderMessage = function (message) {
  var $chats = $('#chats');
  var $post = $('<div class="chat"></div>');

  if (!message.roomname) {
    message.roomname = 'lobby';
  }

  var $username = '<div class="username">' + message.username + '</div>';

  if (app.friends[message.username] === true) {
    $('username').addClass('friend');
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
  var $roomSelect = $('#roomSelect');
  console.log('before');
  console.log($roomSelect);
  $roomSelect.append('<option>' + room + '</option>');
  console.log('after appending the NEW room');
  console.log($roomSelect);
};

app.renderRoomChange = function(event) {
  var $roomSelect = $('#roomSelect');
  var selectIndex = $roomSelect.prop('selectedIndex');
  if (selectIndex === 0) {
    var roomname = prompt('What room would you like to add?');
    if (roomname) {
      app.roomname = roomname;
      app.renderRoom(roomname);
      $roomSelect.val(roomname); 
    }
  } else {
    app.roomname = $roomSelect.val();
    
  }
  app.renderMessages(app.messages);
};

app.handleUsernameClick = function (event) {
  // if clicked, traverse dom to find clicked class
  // $('#chats').on('click', 'username')
  
  var friend = $(this).text();
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
  var $message = $('#message');
  var message = {
    username: app.username,
    text: $message.val(),
    roomname: app.roomname || 'lobby'
  };
  app.send(message);

  event.preventDefault();
};













