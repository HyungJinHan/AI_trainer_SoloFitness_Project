const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const server = require('http').createServer(app);
require("dotenv").config();

const PORT = process.env.PORT || 8008

let corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.post("/hi", (req, res) => {
  var id = parseInt(req.body.id);

  db.query("SELECT * FROM users WHERE id = ?;", [id], (err, result) => {
    res.send(result);
  });
});


app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});