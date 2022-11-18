const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let corsOptions = {
  origin: "*",
  credential: true,
};

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

server.listen(process.env.PORT || 8000, () => {
  console.log("Server Running");
});