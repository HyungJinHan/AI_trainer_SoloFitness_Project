const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const PORT = 8008;

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

require("dotenv").config();

let corsOptions = {
  origin: "*",
  credential: true,
};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // + heroku url
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "System",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "System", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "System",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.post("/hi", (req, res) => {
  const sqlQuery = "SELECT * FROM users WHERE id = 10;";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/fitnessresult", (req, res) => {
  const sqlQuery =
    "SELECT * FROM EXCERCISE_TABLE ORDER BY EXCERCISE_DATE LIMIT 5;";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

server.listen(3001, () => {
  console.log("Server Running 3001");
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
