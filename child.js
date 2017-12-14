var http = require('http');
var agent = new http.Agent({keepAlive: true});




const clientSocket = agent.createConnection ({
  hostname: '127.0.0.1',
  port: 8100
}, ()=>{
  clientSocket.on('data', (message)=> {
    console.log('message from parent server=======>', message.toString('utf8'));
  });
});

// TODO probably in the LINE #19, only one socket is allowed.
// TODO more POC needed
// const options = {
//   port: 8100,
//   hostname: '127.0.0.1',
//   path: '/'
//   agent: agent
// };
//
// const req = http.request(options);
// req.end();

console.log('Hi I am child process');
process.on('message', (data)=>{
  console.log(data);
  setTimeout(()=>{process.send('This message is sent from CHILD process!')}, 1300)
});

process.send('INIT MESSAGE EXCHANGE');
