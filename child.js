console.log('Hi I am child process');
process.on('message', (data)=>{
  console.log(data);
  setTimeout(()=>{process.send('This message is sent from CHILD process!')}, 1300)
});

process.send('INIT MESSAGE EXCHANGE');
