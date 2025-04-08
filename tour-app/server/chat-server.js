const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store admin socket and user sockets
let adminSocket = null;
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle admin connection
  socket.on('admin-connect', () => {
    console.log('Admin connected');
    adminSocket = socket;
    
    // Send existing users to admin
    userSockets.forEach((userSocket, userId) => {
      adminSocket.emit('new-user', userId, userSocket.username);
      
      // Send existing messages for each user
      const messages = db.getUserMessages(userId);
      messages.forEach(msg => {
        adminSocket.emit('user-message', {
          userId,
          message: msg.text,
          timestamp: new Date(msg.timestamp).toLocaleTimeString('fa-IR'),
          isAdmin: msg.is_admin === 1
        });
      });
    });
  });

  // Handle user connection
  socket.on('user-connect', (username) => {
    console.log('User connected:', username);
    const userId = socket.id;
    
    // Save user to database
    db.createUser(userId, username);
    
    // Store user in memory
    userSockets.set(userId, { 
      socket, 
      username
    });
    
    // Notify admin of new user
    if (adminSocket) {
      adminSocket.emit('new-user', userId, username);
    }

    // Send previous messages to user
    const messages = db.getUserMessages(userId);
    messages.forEach(msg => {
      socket.emit('message', msg.text);
    });
  });

  // Handle messages from users
  socket.on('message', (message) => {
    const userId = socket.id;
    const timestamp = new Date().toLocaleTimeString('fa-IR');
    
    // Save message to database
    db.saveMessage(userId, message, false);
    
    // Forward message to admin if connected
    if (adminSocket) {
      adminSocket.emit('user-message', {
        userId,
        message,
        timestamp,
        isAdmin: false
      });
    }
  });

  // Handle messages from admin
  socket.on('admin-message', ({ userId, message }) => {
    const userSocket = userSockets.get(userId);
    if (userSocket) {
      const timestamp = new Date().toLocaleTimeString('fa-IR');
      
      // Save message to database
      db.saveMessage(userId, message, true);
      
      // Send to user
      userSocket.socket.emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    if (socket === adminSocket) {
      console.log('Admin disconnected');
      adminSocket = null;
    } else {
      const userId = socket.id;
      if (userSockets.has(userId)) {
        console.log('User disconnected:', userId);
        userSockets.delete(userId);
        // Notify admin of user disconnection
        if (adminSocket) {
          adminSocket.emit('user-disconnect', userId);
        }
      }
    }
  });
});

// API endpoints for message history
app.get('/api/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const messages = db.getUserMessages(userId);
  res.json(messages);
});

app.get('/api/messages', (req, res) => {
  const messages = db.getAllMessages();
  res.json(messages);
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
}); 