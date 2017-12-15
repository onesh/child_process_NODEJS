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

console.log('Hi I am child process');
process.on('message', (data)=>{
  console.log(data);
  setTimeout(()=>{process.send('This message is sent from CHILD process!')}, 1300)
});

process.send('INIT MESSAGE EXCHANGE');
