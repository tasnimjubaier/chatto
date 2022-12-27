const net = require('net');

const clients = []; // list of connected clients

const server = net.createServer((socket) => {
  console.log('Client connected');

  clients.push(socket); // add the new client to the list

  // Broadcast incoming messages to all connected clients
  socket.on('data', (data) => {
    console.log(`Received message from client: ${data}`);
    clients.forEach((client) => {
      client.write(`[${socket.remoteAddress}]: ${data}`);
    });
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1); // remove the client from the list
    }
  });
});

// Start the server on a specific port
server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
