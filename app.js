const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

const errorHandler = require("./middleware/error");

// const DBConnection = require("./config/db");

dotenv.config({ path: "./config/.env" });

// DBConnection();

const v2 = require("./routes/v2");

const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const shopRouter = require("./routes/shop");
const rankingRouter = require("./routes/ranking");
const gameRouter = require("./routes/game");
const mypageRouter = require("./routes/mypage");

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const { isColString } = require("sequelize/types/lib/utils");
const { CLIENT_RENEG_LIMIT } = require("tls");

const app = express();
passportConfig();

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

app.use(passport.initialize());
app.use(passport.session());

const versionOne = (routeName) => `/api/v2/${routeName}`;

app.use(versionOne("main"), mainRouter);
app.use(versionOne("auth"), authRouter);
app.use(versionOne("shop"), shopRouter);
app.use(versionOne("ranking"), rankingRouter);
app.use(versionOne("game"), gameRouter);
app.use(versionOne("mypage"), mypageRouter);

app.use(errorHandler);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(PORT, () => {
  console.log(
    `We are live on ${process.env.VUE_APP_API} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

console.log("TEST")