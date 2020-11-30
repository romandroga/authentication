const server = require('./server');

server(3001, (err) => {
  if (err) {
    console.log('Error on listen :', err);
    process.exit(1);
  }
  console.log('Server is alive on port 3001');
});
