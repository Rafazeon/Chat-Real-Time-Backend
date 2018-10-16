const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'public'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// app.use('/', (req, res) => {
//   res.render('index.html');
// });

let messages = [];

function formatDate(date) {
  var day = date.toUTCString('pt-BR');
  return day;
}

io.on('connection', (socket) => {
  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    var date = new Date();
    socket.emit('timer', formatDate(date));
  });

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
    console.log(data)
  })
});


server.listen(3030);