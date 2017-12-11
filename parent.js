const { spawn } = require('child_process');
console.log('Hi I am parent process!');

const child_process = spawn(process.argv[0], ['child.js'],  {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  encoding: 'utf8'
});

child_process.on('error', (err) => {
  console.log('Failed to start subprocess.');
});

child_process.on('message', (data)=> {
  console.log(data);
  setTimeout(()=>{child_process.send('This message is sent from PARENT process!')}, 1300);
})


child_process.stdout.on('data', function (data) {
console.log(data.toString());
});
