const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const PORT = 8008;
const SOCKET_PORT = 3001;

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

const db = mysql.createPool({
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

app.post("/", (req, res) => {
  const sqlQuery =
    "SELECT user_id, user_pw, user_name, user_nickname, user_email FROM USER_TABLE WHERE user_id = 'TEST1';";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("/hi(res) ->", result);
  });
});

app.post("/fitnessresult", (req, res) => {
  const execurl = req.body.execiseCategories;
  const sqlQuery =
    "SELECT * FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = ? ORDER BY EXCERCISE_DATE LIMIT 5";

  db.query(sqlQuery, [execurl], (err, result) => {
    res.send(result);
  });
});

/** 검색 */
app.post("/searchcount", (req, res) => {
  const searchword = req.body.searchword;
  console.log("searchcount/req ->", searchword);

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM VIDEO_TABLE WHERE VIDEO_TITLE LIKE ?;";

  db.query(sqlQuery, ["%" + searchword + "%"], (err, result) => {
    res.send(result);
    console.log("searchcount/result ->", result);
  });
});

app.post("/search", (req, res) => {
  const searchword = req.body.searchword;

  const sqlQuery =
    "SELECT VIDEO_NUM, VIDEO_TITLE, VIDEO_WRITER, VIDEO_DATE, VIDEO_ADDRESS, VIDEO_CATEGORY, VIDEO_THUMBNAIL FROM VIDEO_TABLE WHERE VIDEO_TITLE LIKE ?;";
  db.query(sqlQuery, ["%" + searchword + "%"], (err, result) => {
    res.send(result);
    console.log("search/result ->", result);
  });
});

/** 유저 로그인 */
app.post("/userlogin", (req, res) => {
  const USER_ID = req.body.USER_ID;
  const USER_PW = req.body.USER_PW;

  const sqlQuery =
    "SELECT USER_ID, USER_PW, count(*) as 'cnt' FROM USER_TABLE WHERE USER_ID = ? AND USER_PW = ?;";

  db.query(sqlQuery, [USER_ID, USER_PW], (err, result) => {
    res.send(result);
  });
});

/** 센터 로그인 */
app.post("/centerlogin", (req, res) => {
  const CENTER_ID = req.body.CENTER_ID;
  const CENTER_PW = req.body.CENTER_PW;

  const sqlQuery =
    "SELECT CENTER_ID, CENTER_PW, count(*) as 'cnt' FROM CENTER_TABLE WHERE CENTER_ID = ? AND CENTER_PW = ?;";

  db.query(sqlQuery, [CENTER_ID, CENTER_PW], (err, result) => {
    res.send(result);
  });
});

/** 유저 회원가입 */
app.post("/userjoin", (req, res) => {
  var USER_ID = req.body.USER_ID;
  var USER_PW = req.body.USER_PW;
  var USER_NAME = req.body.USER_NAME;
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_EMAIL = req.body.USER_EMAIL;
  var USER_ADDRESS = req.body.USER_ADDRESS;
  var USER_TEL = req.body.USER_TEL;
  var USER_SEX = req.body.USER_SEX;

  const sqlQuery =
    "INSERT INTO USER_TABLE VALUES (?, ?, ?, ?, ?, ?, ?, null,?, null, null, null, null);";
  db.query(
    sqlQuery,
    [
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_NICKNAME,
      USER_EMAIL,
      USER_ADDRESS,
      USER_TEL,
      USER_SEX,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

/** 유저 닉네임 중복 체크 */
app.post("/usernicknamecheck", (req, res) => {
  const USER_NICKNAME = req.body.USER_NICKNAME;
  console.log("USER_NICKNAME ->", USER_NICKNAME);

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM USER_TABLE WHERE USER_NICKNAME = ?;";

  db.query(sqlQuery, [USER_NICKNAME], (err, result) => {
    res.send(result);
    console.log("USER_NICKNAME check ->", result);
  });
});

/** 유저 아이디 중복 체크 */
app.post("/useridcheck", (req, res) => {
  const USER_ID = req.body.USER_ID;
  console.log("USER_ID ->", USER_ID);

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM USER_TABLE WHERE USER_ID = ?;";

  db.query(sqlQuery, [USER_ID], (err, result) => {
    res.send(result);
    console.log("USER_ID check ->", result);
  });
});

/** 유저 센터 키 중복 체크 */
app.post("/centerkeycheck", (req, res) => {
  const CENTER_ID = req.body.USER_ID;
  const CENTER_ACCESS_CODE = req.body.CENTER_ACCESS_CODE;

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM CENTER_TABLE WHERE CENTER_ID = ? AND CENTER_ACCESS_CODE = ?;";

  db.query(sqlQuery, [CENTER_ID, CENTER_ACCESS_CODE], (err, result) => {
    res.send(result);
    console.log("CENTER_ACCESS_CODE check ->", result);
  });
});

/** 센터 회원가입 */
app.post("/centerjoin", (req, res) => {
  var CENTER_ID = req.body.CENTER_ID;
  var CENTER_PW = req.body.CENTER_PW;
  var CENTER_ADDRESS = req.body.CENTER_ADDRESS;
  var CENTER_NAME = req.body.CENTER_NAME;
  var CENTER_TEL = req.body.CENTER_TEL;
  var CENTER_EMAIL = req.body.CENTER_EMAIL;
  var CENTER_ACCESS_CODE = req.body.CENTER_ACCESS_CODE;

  const sqlQuery = "INSERT INTO CENTER_TABLE VALUES (?, ?, ?, ?, ?, ?, ?);";
  db.query(
    sqlQuery,
    [
      CENTER_ID,
      CENTER_PW,
      CENTER_ADDRESS,
      CENTER_NAME,
      CENTER_TEL,
      CENTER_EMAIL,
      CENTER_ACCESS_CODE,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

/** 센터 이름 중복 체크 */
app.post("/centernamecheck", (req, res) => {
  const CENTER_NAME = req.body.CENTER_NAME;
  console.log("CENTER_NAME ->", CENTER_NAME);

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM CENTER_TABLE WHERE CENTER_NAME = ?;";

  db.query(sqlQuery, [CENTER_NAME], (err, result) => {
    res.send(result);
    console.log("centernamecheck ->", result);
  });
});

/** 사업자 등록번호 중복 체크 */
app.post("/centeridcheck", (req, res) => {
  const CENTER_ID = req.body.CENTER_ID;
  console.log("CENTER_ID ->", CENTER_ID);

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM CENTER_TABLE WHERE CENTER_ID = ?;";

  db.query(sqlQuery, [CENTER_ID], (err, result) => {
    res.send(result);
    console.log("centeridcheck ->", result);
  });
});

/** 운동 디테일 페이지 */
app.post("/detail", (req, res) => {
  const exec = req.body.detailExec;

  const sqlQuery =
    "SELECT VIDEO_CATEGORY,VIDEO_PREPARE,VIDEO_INFO,VIDEO_EFFECT FROM VIDEO_TABLE WHERE VIDEO_TITLE = ?;";
  db.query(sqlQuery, [exec], (err, result) => {
    res.send(result);
    console.log("detail/result ->", result);
  });
});

/** 카테고리 */
// app.post("/category", (req, res) => {
//   console.log("category(req)->", req.body.params.category);
// });

server.listen(3001, () => {
  console.log(`Socket Server Running PORT ${SOCKET_PORT}`);
});

app.listen(PORT, () => {
  console.log(`Node.js Server Running PORT ${PORT}`);
});
