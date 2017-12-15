var http = require('http');



// TODO probably in the LINE #19, only one socket is allowed.
// TODO more POC needed
const options = {
  host:'127.0.0.1',
  port: 8100,
  path: '/',
  headers: {
    'Content-Type': 'application/text',
    'Content-Length': '1010',
    'Connection': 'keep-alive'
  },
};

const req = http.get(options);
req.on('response', (res)=> {
  console.log('Handsheke complete');
});

req.on('socket', (socket) => {
    socket.on('data', (data)=> {
      console.log(data.toString('utf8'));
    });
});

req.on('error', (err) => {
  console.log(err);
});
