const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Router Import
const AuthRouter = require("./routes/AuthRouter");
const MiscRouter = require("./routes/MiscRouter");
const { createSocket } = require("./routes/Sockets");

// .env environment variables import and configuration
// Using dotenv
require("dotenv").config();

// Configuration Setting
// MongoDB Database Connection
require("./config/db");

const app = express();
const httpServer = http.createServer(app);
const io = createSocket(httpServer);

app.use(express.static("data"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Passport.js Configuration
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// Routes Setting
app.use("/auth", AuthRouter);
app.use("/misc", MiscRouter);

// Enable the app and listen
httpServer.listen(process.env.SERVER_PORT, () =>
  console.log("Now listening...")
);
