const { spawn } = require('child_process');
console.log('Hi I am parent process!');
const http = require('http');


const httpserver = http.createServer ((req, res) => {
  //req.end('hello child');
  console.log('incoming request (get/post) connection from child process');

});
httpserver.listen(8100, '127.0.0.1', () => {
  console.log('parent server is up!');
});

httpserver.on('connection', (socket) => {  // emitted when a new socket connection is established
  console.log('incoming socket connection from child process');
  socket.write('connected');
});

const child_process = spawn(process.argv[0], ['child.js'],  {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  encoding: 'utf8'
});

child_process.on('error', (err) => {
  console.log('Failed to start subprocess.', err);
});

child_process.on('message', (data)=> {
  console.log(data);
  setTimeout(()=>{child_process.send('This message is sent from PARENT process!')}, 1300);
});

child_process.stdout.on('data', function (data) {
console.log(data.toString());
});
