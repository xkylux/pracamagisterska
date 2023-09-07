const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express();
// const port = 5000

const httpServer = createServer(app);
global.io = new Server(httpServer);

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

const admins = [];
let activeChats = [];
function get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

io.on("connection", (socket) => {
  socket.on("admin connected with server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
  });
  socket.on("user sending message", (msg) => {
    if (admins.length === 0) {
      socket.emit("no admin", "");
    } else {
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdminId;
      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins);
        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdminId = admin.id;
      }
      socket.broadcast.to(targetAdminId).emit("server sendig client message to admin", {
        user: socket.id,
        message: msg,
      })
    }
  })

  socket.on("admin sending message", ({ user, message }) => {
    socket.broadcast.to(user).emit("server sendig admin message to client", message);
  })

  socket.on("admin leave chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin leave chat", "");
    let lave = io.sockets.sockets.get(socketId);
    lave.disconnect(); // reason:  server namespace disconnect
  })

  socket.on("disconnect", (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1);
    }
    activeChats = activeChats.filter((item) => item.adminId !== socket.id);

    //user disconnected
    const removeUserId = activeChats.findIndex((item) => item.clientId === socket.id);
    if (removeUserId !== -1) {
      activeChats.splice(removeUserId, 1);
    }
    socket.broadcast.emit("disconnected", { reason: reason, socketId: socket.id });
  });
});



const apiRoutes = require("./routes/apiRoutes")
app.get('/', async (req, res, next) => {
  res.json({ message: "API running..." })
})

//mongodb Connection
const connectDB = require("./config/db")
const Product = require('./models/productModel')
connectDB();

app.use('/api', apiRoutes)
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error)
  }
  next(error)
})

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  } else {
    res.status(500).json({
      message: error.message
    })
  }
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Serwer pracuje na porcie ${PORT}`));
