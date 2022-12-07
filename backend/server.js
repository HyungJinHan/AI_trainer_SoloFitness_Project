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
const multer = require("multer");
const fs = require("fs");
// const iconv = require("iconv-lite");

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
app.use("/uploads", express.static("uploads"));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
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
      text: `${user.name}님 환영합니다.
      ${user.room} 채팅 방입니다.`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "System",
      text: `${user.name}님이 들어오셨습니다.`,
    });

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
        text: `${user.name}님이 나가셨습니다.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

/** 이미지 업로드 코드 */
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/", (req, res) => {
  const sqlQuery =
    "SELECT user_id, user_pw, user_name, user_nickname, user_email FROM USER_TABLE WHERE user_id = 'TEST1';";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("/hi(res) ->", result);
  });
});
/** NIVO차트에 들어갈 정보 */
app.post("/fitnessresult", (req, res) => {
  const execurl = req.body.execiseCategories;
  const userNickname = req.body.userNickname;
  //니보에서 가장 최근 기록이 가장 오른쪽에 가도록 정렬해온 데이터를 다시 정렬
  const sqlQuery = `SELECT EXCERCISE_NAME, EXCERCISE_COUNT, EXCERCISE_DATE AS EXCERCISE_DATE 
    FROM (SELECT EXCERCISE_NAME, EXCERCISE_COUNT, DATE_FORMAT(EXCERCISE_DATE, '%Y-%m-%d %H:%i %S초') AS EXCERCISE_DATE FROM EXCERCISE_TABLE
    WHERE EXCERCISE_NAME = ? AND EXCERCISE_USER = ? ORDER BY EXCERCISE_DATE DESC LIMIT 7) AS A ORDER BY EXCERCISE_DATE ASC;`;

  db.query(sqlQuery, [execurl, userNickname], (err, result) => {
    res.send(result);
    console.log("nodejs fitnessresult", result);
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
  var USER_ACCESS_CODE = req.body.USER_ACCESS_CODE;
  var USER_AGE = req.body.USER_AGE;

  const sqlQuery =
    "INSERT INTO USER_TABLE VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null, null, null, null);";
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
      USER_ACCESS_CODE,
      USER_SEX,
      USER_AGE,
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
  const CENTER_NAME = req.body.CENTER_NAME;
  const CENTER_ACCESS_CODE = req.body.CENTER_ACCESS_CODE;

  const sqlQuery =
    "SELECT COUNT(*) as COUNT FROM CENTER_TABLE WHERE CENTER_NAME = ? AND CENTER_ACCESS_CODE = ?;";

  db.query(sqlQuery, [CENTER_NAME, CENTER_ACCESS_CODE], (err, result) => {
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
  console.log("/detail(req)->", exec);

  const sqlQuery =
    "SELECT VIDEO_THUMBNAIL, VIDEO_CATEGORY, VIDEO_PREPARE, VIDEO_INFO, VIDEO_EFFECT FROM VIDEO_TABLE WHERE VIDEO_TITLE = ?;";
  db.query(sqlQuery, [exec], (err, result) => {
    res.send(result);
    console.log("detail/result ->", result);
  });
});

/** 운동 후 유저 닉네임 알아내기 */
app.post("/fitnessresultusernickname", (req, res) => {
  var nickname = req.body.userNickname;

  const sqlQuery = "SELECT USER_NICKNAME FROM USER_TABLE WHERE USER_ID = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});

/** 운동정보 결과 INSERT(NIVO에 쓰기위함) */
app.post("/fitnessresultinfoinsert", (req, res) => {
  const userNickname = req.body.userNickname;
  const excerciseName = req.body.excerciseName;
  const excerciseCount = req.body.excerciseCount;

  const sqlQuery =
    "INSERT INTO EXCERCISE_TABLE(EXCERCISE_USER, EXCERCISE_NAME, EXCERCISE_COUNT) VALUES (?,?,?);";
  db.query(
    sqlQuery,
    [userNickname, excerciseName, excerciseCount],
    (err, result) => {}
  );
});

/** 카테고리 */
/* app.post("/category", (req, res) => {
  const categories = req.body.categories;
  // console.log("category(req)->", categories);

  const datalist = [];
  for (let i = 0; i < categories.length; i++) {
    let category = req.body.categories[i]["category"];
    console.log("category=", category);

    const sqlQuery =
      "SELECT VIDEO_TITLE,VIDEO_CATEGORY,VIDEO_THUMBNAIL FROM VIDEO_TABLE WHERE VIDEO_CATEGORY = ?;";
    db.query(sqlQuery, [category], (err, result) => {
      datalist[i] = result;
      // console.log(i, "번째 category/result->", datalist);

      if (i == categories.length - 1) {
        console.log(i, "번째 category/result->", datalist);
        res.send(datalist);
      }
    });
  }
}); */
app.post("/onecategory", (req, res) => {
  const sqlQuery =
    "SELECT VIDEO_TITLE,VIDEO_CATEGORY,VIDEO_WRITER,VIDEO_THUMBNAIL FROM VIDEO_TABLE WHERE VIDEO_CATEGORY=?;";

  db.query(sqlQuery, [req.body.category], (err, result) => {
    res.send(result);
  });
});

app.post("/legtheme", (req, res) => {
  const VIDEO_CATEGORY = req.body.VIDEO_CATEGORY;

  const sqlQuery =
    "SELECT VIDEO_THUMBNAIL, VIDEO_TITLE, VIDEO_CATEGORY, VIDEO_BODY_PART FROM VIDEO_TABLE WHERE VIDEO_CATEGORY = ?;";

  db.query(sqlQuery, [VIDEO_CATEGORY], (err, result) => {
    res.send(result);
  });
});

/** 마이페이지 조회 */
app.post("/myInfo", (req, res) => {
  const USER_ID = req.body.USER_ID;

  const sqlQuery = "SELECT * FROM USER_TABLE WHERE USER_ID = ?;";

  db.query(sqlQuery, [USER_ID], (err, result) => {
    res.send(result);
  });
});

app.post("/legtheme", (req, res) => {
  const VIDEO_CATEGORY = req.body.VIDEO_CATEGORY;

  const sqlQuery =
    "SELECT VIDEO_THUMBNAIL, VIDEO_TITLE FROM VIDEO_TABLE WHERE VIDEO_CATEGORY = ?;";

  db.query(sqlQuery, [VIDEO_CATEGORY], (err, result) => {
    res.send(result);
  });
});

/** 마이페이지 수정 */
app.post("/updatemyInfo", upload.single("USER_IMAGE"), (req, res) => {
  var USER_ID = req.body.USER_ID;
  var USER_PW = req.body.USER_PW;
  var USER_NAME = req.body.USER_NAME;
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_EMAIL = req.body.USER_EMAIL;
  var USER_ADDRESS = req.body.USER_ADDRESS;
  var USER_TEL = req.body.USER_TEL;
  var USER_SEX = req.body.USER_SEX;
  var USER_ACCESS_CODE = req.body.USER_ACCESS_CODE;

  const sqlQuery =
    "UPDATE USER_TABLE SET USER_PW = ?,USER_NAME = ?,USER_NICKNAME = ?,USER_EMAIL = ?,USER_ADDRESS = ?,USER_TEL = ?,USER_ACCESS_CODE =?, USER_SEX = ?, USER_IMAGE = ? WHERE USER_ID = ?;";
  db.query(
    sqlQuery,
    [
      USER_PW,
      USER_NAME,
      USER_NICKNAME,
      USER_EMAIL,
      USER_ADDRESS,
      USER_TEL,
      USER_ACCESS_CODE,
      USER_SEX,
      req.file.filename,
      USER_ID,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

/** 회원탈퇴 */
app.post("/deleteuser", (req, res) => {
  const USER_ID = req.body.USER_ID;

  const sqlQuery = "DELETE FROM USER_TABLE WHERE USER_ID = ?;";

  db.query(sqlQuery, [USER_ID], (err, result) => {
    res.send(result);
  });
});

/** 센터 정보 조회 */
app.post("/centerInfo", (req, res) => {
  const CENTER_ID = req.body.CENTER_ID;

  const sqlQuery = "SELECT * FROM CENTER_TABLE WHERE CENTER_ID = ?;";

  db.query(sqlQuery, [CENTER_ID], (err, result) => {
    res.send(result);
  });
});

/** 센터 회원 정보 조회 */
// app.post("/memberInfo", (req, res) => {
//   const CENTER_ID = req.body.CENTER_ID;

//   const sqlQuery =
//     "SELECT USER_ID,USER_NAME,USER_SEX,USER_AGE,USER_TEL FROM USER_TABLE WHERE USER_ACCESS_CODE = (SELECT CENTER_ACCESS_CODE FROM CENTER_TABLE WHERE CENTER_ID = ?);";

//   db.query(sqlQuery, [CENTER_ID], (err, result) => {
//     res.send(result);
//     console.log("center_memberinfo(res)->", result);
//   });
// });
app.post("/membercount", (req, res) => {
  const CENTER_ID = req.body.CENTER_ID;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM USER_TABLE WHERE USER_ACCESS_CODE = (SELECT CENTER_ACCESS_CODE FROM CENTER_TABLE WHERE CENTER_ID = ?);";

  db.query(sqlQuery, [CENTER_ID], (err, result) => {
    res.send(result);
  });
});
app.post("/memberlist", (req, res) => {
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  const start_limit = (page_num - 1) * page_size;

  const CENTER_ID = req.body.CENTER_ID;

  const sqlQuery =
    "SELECT USER_ID,USER_NAME,USER_SEX,USER_AGE,USER_TEL FROM USER_TABLE WHERE USER_ACCESS_CODE = (SELECT CENTER_ACCESS_CODE FROM CENTER_TABLE WHERE CENTER_ID = ?) LIMIT ?, ?;";

  db.query(sqlQuery, [CENTER_ID, start_limit, page_size], (err, result) => {
    res.send(result);
    console.log("center_memberlist(res)->", result);
  });
});

/** 센터 업로드 */
app.post("/centerupload", (req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const info = req.body.info;
  const effect = req.body.effect;
  const address = req.body.address;
  const part = req.body.part;
  const prepare = req.body.prepare;
  const writer = req.body.writer;

  const sqlQuery =
    "INSERT INTO CT_VIDEO_TABLE (CT_VIDEO_TITLE, CT_VIDEO_WRITER, CT_VIDEO_CATEGORY, CT_VIDEO_ADDRESS, CT_VIDEO_INFO, CT_VIDEO_BODY_PART, CT_VIDEO_EFFECT, CT_VIDEO_PREPARE) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";

  db.query(
    sqlQuery,
    [title, writer, category, address, info, part, effect, prepare],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/videocount", (req, res) => {
  var CT_VIDEO_WRITER = req.body.CT_VIDEO_WRITER;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM CT_VIDEO_TABLE WHERE CT_VIDEO_WRITER = ?;";
  db.query(sqlQuery, [CT_VIDEO_WRITER], (err, result) => {
    res.send(result);
  });
});

/** 센터 영상 리스트 조회 */
app.post("/videolist", (req, res) => {
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  const start_limit = (page_num - 1) * page_size;

  const CT_VIDEO_WRITER = req.body.CT_VIDEO_WRITER;

  const sqlQuery =
    "SELECT * FROM CT_VIDEO_TABLE WHERE CT_VIDEO_WRITER = ? LIMIT ?, ?;";

  db.query(
    sqlQuery,
    [CT_VIDEO_WRITER, start_limit, page_size],
    (err, result) => {
      res.send(result);
    }
  );
});

/** 센터 디테일 페이지 */
app.post("/centerdetail", (req, res) => {
  const centerExec = req.body.centerExec;

  const sqlQuery =
    "SELECT CT_VIDEO_TITLE,CT_VIDEO_CATEGORY,CT_VIDEO_ADDRESS,CT_VIDEO_INFO,CT_VIDEO_BODY_PART,CT_VIDEO_EFFECT,CT_VIDEO_PREPARE FROM CT_VIDEO_TABLE WHERE CT_VIDEO_TITLE = ?;";
  db.query(sqlQuery, [centerExec], (err, result) => {
    res.send(result);
  });
});

/** 스쿼트 챌린지 */
app.post("/squatchallenge", (req, res) => {
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_SCORE = req.body.USER_SCORE;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_SQUAT_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_SQUAT_SCORE = ?;";

  db.query(sqlQuery, [USER_NICKNAME, USER_SCORE, USER_SCORE], (err, result) => {
    console.log("result", result);
  });
});

/** 풀업 챌린지 */
app.post("/pullupchallenge", (req, res) => {
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_SCORE = req.body.USER_SCORE;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_PULLUP_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_PULLUP_SCORE = ?;";

  db.query(sqlQuery, [USER_NICKNAME, USER_SCORE, USER_SCORE], (err, result) => {
    console.log("result", result);
  });
});

/** 푸쉬업 챌린지 */
app.post("/pushupchallenge", (req, res) => {
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_SCORE = req.body.USER_SCORE;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_PUSHUP_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_PUSHUP_SCORE = ?;";

  db.query(sqlQuery, [USER_NICKNAME, USER_SCORE, USER_SCORE], (err, result) => {
    console.log("result", result);
  });
});

/** 싯업 챌린지 */
app.post("/situpchallenge", (req, res) => {
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_SCORE = req.body.USER_SCORE;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_SITUP_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_SITUP_SCORE = ?;";

  db.query(sqlQuery, [USER_NICKNAME, USER_SCORE, USER_SCORE], (err, result) => {
    console.log("result", result);
  });
});

/** 덤벨컬 챌린지 */
app.post("/curlchallenge", (req, res) => {
  var USER_NICKNAME = req.body.USER_NICKNAME;
  var USER_SCORE = req.body.USER_SCORE;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_CURL_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_CURL_SCORE = ?;";

  db.query(sqlQuery, [USER_NICKNAME, USER_SCORE, USER_SCORE], (err, result) => {
    console.log("result", result);
  });
});

/** 각 챌린지별 운동 점수 가져오기 */
app.post("/challengescore", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 각 챌린지별 운동 점수 최종 스코어에 넣기 */
app.post("/challengescoreresult", (req, res) => {
  var NICKNAME = req.body.Nickname;
  var resultScore = req.body.resultScore1;
  var profile = req.body.profile;
  const sqlQuery =
    "INSERT INTO CHALLENGE_TABLE (CHALLENGE_USER,CHALLENGE_SCORE) VALUES(?,?) ON DUPLICATE KEY UPDATE CHALLENGE_SCORE = ?;";
  db.query(sqlQuery, [NICKNAME, resultScore, resultScore], (err, result) => {});
});

/** 챌린지 랭킹 닉네임 점수 표시하기 */
app.post("/challengerank", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_SCORE DESC) AS RANKING , CHALLENGE_USER, CHALLENGE_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시 */
app.post("/mychallengerank", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시 */
app.post("/mychallengeranking", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_SCORE > ( SELECT CHALLENGE_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 챌린지 랭킹 닉네임 점수 표시하기(스쿼트) */
app.post("/challengeranksquat", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_SQUAT_SCORE DESC) AS RANKING , CHALLENGE_USER, USER_IMAGE, CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시(스쿼트) */
app.post("/mychallengeranksquat", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_SQUAT_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시(스쿼트) */
app.post("/mychallengerankingsquat", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_SQUAT_SCORE > ( SELECT CHALLENGE_SQUAT_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 챌린지 랭킹 닉네임 점수 표시하기(풀업) */
app.post("/challengerankpullup", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_PULLUP_SCORE DESC) AS RANKING , CHALLENGE_USER, USER_IMAGE, CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시(풀업) */
app.post("/mychallengerankpullup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_PULLUP_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시(풀업) */
app.post("/mychallengerankingpullup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_PULLUP_SCORE > ( SELECT CHALLENGE_PULLUP_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 챌린지 랭킹 닉네임 점수 표시하기(푸쉬업) */
app.post("/challengerankpushup", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_PUSHUP_SCORE DESC) AS RANKING , CHALLENGE_USER, USER_IMAGE, CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시(푸쉬업) */
app.post("/mychallengerankpushup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_PUSHUP_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시(푸쉬업) */
app.post("/mychallengerankingpushup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_PUSHUP_SCORE > ( SELECT CHALLENGE_PUSHUP_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 챌린지 랭킹 닉네임 점수 표시하기(싯업) */
app.post("/challengeranksitup", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_SITUP_SCORE DESC) AS RANKING , CHALLENGE_USER, USER_IMAGE, CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시(싯업) */
app.post("/mychallengeranksitup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_SITUP_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시(싯업) */
app.post("/mychallengerankingsitup", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_SITUP_SCORE > ( SELECT CHALLENGE_SITUP_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 챌린지 랭킹 닉네임 점수 표시하기(덤벨컬) */
app.post("/challengerankcurl", (req, res) => {
  const sqlQuery =
    "SELECT RANK() OVER (ORDER BY CHALLENGE_CURL_SCORE DESC) AS RANKING , CHALLENGE_USER, USER_IMAGE, CHALLENGE_SQUAT_SCORE,CHALLENGE_PULLUP_SCORE,CHALLENGE_PUSHUP_SCORE,CHALLENGE_SITUP_SCORE,CHALLENGE_CURL_SCORE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME LIMIT 10;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 닉네임 점수 표시(덤벨컬) */
app.post("/mychallengerankcurl", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT CHALLENGE_USER, CHALLENGE_CURL_SCORE, USER_IMAGE FROM CHALLENGE_TABLE INNER JOIN USER_TABLE ON CHALLENGE_TABLE.CHALLENGE_USER = USER_TABLE.USER_NICKNAME WHERE CHALLENGE_USER = ?;";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});

/** 내 챌린지 랭킹 표시(덤벨컬) */
app.post("/mychallengerankingcurl", (req, res) => {
  var NICKNAME = req.body.Nickname;
  const sqlQuery =
    "SELECT COUNT(*) +1 AS MYRANKING FROM CHALLENGE_TABLE WHERE CHALLENGE_CURL_SCORE > ( SELECT CHALLENGE_CURL_SCORE	FROM CHALLENGE_TABLE WHERE CHALLENGE_USER =  ? );";
  db.query(sqlQuery, [NICKNAME], (err, result) => {
    res.send(result);
  });
});
/** 관리자 페이지 성별(남) */
app.post("/adminusergender", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_SEX) AS MALE FROM USER_TABLE WHERE USER_SEX = 'male';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 성별(여) */
app.post("/adminusergender2", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_SEX) AS FEMALE FROM USER_TABLE WHERE USER_SEX = 'female';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 유저나이(미성년자)*/
app.post("/adminuserage1", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_AGE) AS AGE FROM USER_TABLE WHERE 1 < USER_AGE && USER_AGE < 20;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 유저나이(20대)*/
app.post("/adminuserage2", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_AGE) AS AGE FROM USER_TABLE WHERE 20 <= USER_AGE && USER_AGE < 30;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 유저나이(30대)*/
app.post("/adminuserage3", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_AGE) AS AGE FROM USER_TABLE WHERE 30 <= USER_AGE && USER_AGE < 40;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 유저나이(40대)*/
app.post("/adminuserage4", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_AGE) AS AGE FROM USER_TABLE WHERE 40 <= USER_AGE && USER_AGE < 50;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 유저나이(50대이상)*/
app.post("/adminuserage5", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(USER_AGE) AS AGE FROM USER_TABLE WHERE 50 <= USER_AGE;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 센터가입 유저*/
app.post("/adminusercenter1", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(*) AS ACCESS FROM USER_TABLE WHERE USER_ACCESS_CODE IS NOT NULL;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 관리자 페이지 센터가입x 유저*/
app.post("/adminusercenter2", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(*) AS ACCESS FROM USER_TABLE WHERE USER_ACCESS_CODE IS NULL;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 스쿼트 이용자 수 */
app.post("/adminuserexec1", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(EXCERCISE_NAME) AS EXEC1 FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'squat';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 푸쉬업 이용자 수 */
app.post("/adminuserexec2", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(EXCERCISE_NAME) AS EXEC2 FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'pushup';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 풀업 이용자 수 */
app.post("/adminuserexec3", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(EXCERCISE_NAME) AS EXEC3 FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'pullup';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 싯업 이용자 수 */
app.post("/adminuserexec4", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(EXCERCISE_NAME) AS EXEC4 FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'situp';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 덤벨컬 이용자 수 */
app.post("/adminuserexec5", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(EXCERCISE_NAME) AS EXEC5 FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'curl';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/** 센터정보 불러오기 */
app.post("/admincenter", (req, res) => {
  const sqlQuery =
    "SELECT CENTER_NAME,CENTER_ADRESS,CENTER_ACCESS_CODE,CENTER_TEL,CENTER_ID, COUNT(USER_ACCESS_CODE) AS USER_COUNT FROM CENTER_TABLE LEFT OUTER JOIN USER_TABLE ON USER_TABLE.USER_ACCESS_CODE = CENTER_TABLE.CENTER_ACCESS_CODE GROUP BY CENTER_NAME,CENTER_ADRESS,CENTER_ACCESS_CODE,CENTER_TEL,CENTER_ID,USER_ACCESS_CODE;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/maincenterinfo", (req, res) => {
  var USER_ID = req.body.USER_ID;

  const sqlQuery =
    "SELECT * FROM CENTER_TABLE WHERE CENTER_ACCESS_CODE = (SELECT USER_ACCESS_CODE FROM USER_TABLE WHERE USER_ID = ?);";
  db.query(sqlQuery, [USER_ID], (err, result) => {
    res.send(result);
  });
});

app.post("/codeinfo", (req, res) => {
  var USER_ID = req.body.USER_ID;

  const sqlQuery = "SELECT USER_ACCESS_CODE FROM USER_TABLE WHERE USER_ID = ?;";
  db.query(sqlQuery, [USER_ID], (err, result) => {
    res.send(result);
  });
});

app.post("/registcentervideo", (req, res) => {
  var CENTER_ID = req.body.CENTER_ID;

  const sqlQuery = "SELECT * FROM CT_VIDEO_TABLE WHERE CT_VIDEO_WRITER = ?;";
  db.query(sqlQuery, [CENTER_ID], (err, result) => {
    res.send(result);
  });
});

app.post("/adminlogin", (req, res) => {
  const ADMIN_ID = req.body.ADMIN_ID;
  const ADMIN_PW = req.body.ADMIN_PW;

  const sqlQuery =
    "SELECT ADMIN_ID, ADMIN_PASSWORD, count(*) as 'cnt' FROM ADMIN_TABLE WHERE ADMIN_ID = ? AND ADMIN_PASSWORD = ?;";

  db.query(sqlQuery, [ADMIN_ID, ADMIN_PW], (err, result) => {
    res.send(result);
  });
});
/** 유저 운동 결과 정보(스쿼트) */
app.post("/nivoexec1", (req, res) => {
  const nickname = req.body.nickname;
  const sqlQuery =
    " SELECT COUNT(EXCERCISE_COUNT) AS EXECCOUNT FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'squat' AND EXCERCISE_USER = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});
/** 유저 운동 결과 정보(푸쉬업) */
app.post("/nivoexec2", (req, res) => {
  const nickname = req.body.nickname;
  const sqlQuery =
    " SELECT COUNT(EXCERCISE_COUNT) AS EXECCOUNT FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'pushup' AND EXCERCISE_USER = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});
/** 유저 운동 결과 정보(풀업) */
app.post("/nivoexec3", (req, res) => {
  const nickname = req.body.nickname;
  const sqlQuery =
    " SELECT COUNT(EXCERCISE_COUNT) AS EXECCOUNT FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'pullup' AND EXCERCISE_USER = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});
/** 유저 운동 결과 정보(싯업) */
app.post("/nivoexec4", (req, res) => {
  const nickname = req.body.nickname;
  const sqlQuery =
    " SELECT COUNT(EXCERCISE_COUNT) AS EXECCOUNT FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'situp' AND EXCERCISE_USER = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});
/** 유저 운동 결과 정보(덤벨컬) */
app.post("/nivoexec5", (req, res) => {
  const nickname = req.body.nickname;
  const sqlQuery =
    " SELECT COUNT(EXCERCISE_COUNT) AS EXECCOUNT FROM EXCERCISE_TABLE WHERE EXCERCISE_NAME = 'curl' AND EXCERCISE_USER = ?;";
  db.query(sqlQuery, [nickname], (err, result) => {
    res.send(result);
  });
});

server.listen(3001, () => {
  console.log(`Socket Server Running PORT ${SOCKET_PORT}`);
});

app.listen(PORT, () => {
  console.log(`Node.js Server Running PORT ${PORT}`);
});
