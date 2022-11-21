const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const server = require('http').createServer(app);

require("dotenv").config();

let corsOptions = {
  origin: "*",
  credential: true,
};

let corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

app.post("/hi", (req, res) => {
  const sqlQuery =
    "SELECT * FROM users WHERE id = 10;"

  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(result)
  });
});


app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});