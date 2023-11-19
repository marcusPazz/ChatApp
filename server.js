const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Define a route for the main chat page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.IO logic for real-time communication
io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for incoming messages from the client
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', { message: msg });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server on a specified port
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
