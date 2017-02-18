var app = {};

app.init = function () {
  $('#main').find('.username').on('click', app.handleUsernameClick());
  $('#send .submit').on('submit', app.handleSubmit());
};
app.server = 'http://parse.sfm6.hackreactor.com/';

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
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      consoe.error('chatterbox: Failed to receive messages', data);
    }
  });

};

app.clearMessages = function () {
  $('#chats').empty();
};

app.renderMessage = function (message) {
  var $chats = $('#chats');
  // var $donkey = $('<p></p>');
  // $donkey.addClass('username message');
  // $donkey.text(message.text);
  // $chats.append($donkey);
  var text = message.text;

  $chats.append('<p>' + message.text + '</p>');
  console.log($chats);
};

app.renderRoom = function (room) {
  var $roomSelect = $('#roomSelect');
  $roomSelect.append('<option value=' + room + '>' + room + '</option>');
};


app.handleUsernameClick = function () {
  // if clicked, traverse dom to find clicked class

  // add friend to clicked class
};

app.handleSubmit = function () {

};
/*

<div id="chats">
  <div class="username message">
    <p> Never underestimate the power of the Schwartz! </p>
    <p clicked="false"> Mel brooks </p>
  </div>
</div>

*/ 












