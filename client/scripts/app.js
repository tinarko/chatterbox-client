

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function () {
  $('#main').find('.username').on('click', app.handleUsernameClick());
  $('#send .submit').on('submit', app.handleSubmit());
  $('form').submit(function(event) {
    event.preventDefault();
  });
  app.fetch();
  var set;
  // var roomForm = ?????
  $('#addRoom').on('submit', app.renderRoom(prompt('What room would you like to add?')));
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
    data: JSON.stringify(),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
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
  var $personalMessage = $('<p></p>');
  $personalMessage.addClass('username roomname text');
  // if room matches dropdown
  for (var i = 0; i < message.length; i++) {
    $chats.append('<p>' + message[i].username + ': ' + message[i].text + '</p>');
  }
};

// Allow users to create rooms and enter existing rooms - 
// Rooms are defined by the .roomname property of messages, 
// so you'll need to filter them somehow.

app.renderRoom = function (room) {
  var $roomSelect = $('#roomSelect');
  $roomSelect.append('<option value=' + room + '>' + room + '</option>');
  console.log('renderRoom ran');
};


app.handleUsernameClick = function () {
  // if clicked, traverse dom to find clicked class

  // add friend to clicked class
};

app.handleSubmit = function () {
  console.log('handleSubmit ran');

  // $('form').keypress(function(event) { 
  //   return event.keyCode !== 13;
  // }); 
};
/*

<div id="chats">
  <div class="username message">
    <p> Never underestimate the power of the Schwartz! </p>
    <p clicked="false"> Mel brooks </p>
  </div>
</div>

problems: 
1. display message on screen in general

2. wrting own message in chatterbox
3. ^ upon clicking submit, prepend message

*/ 












