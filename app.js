const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config/.env" });

const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const shopRouter = require("./routes/shop");
const rankingRouter = require("./routes/ranking");
const gameRouter = require("./routes/game");
const mypageRouter = require("./routes/mypage");

const { sequelize } = require("./models");

const app = express();

const PORT = process.env.PORT;
app.set("port", PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/game", gameRouter);
app.use("/mypage", mypageRouter);
app.use("/ranking", rankingRouter);
app.use("/shop", shopRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
