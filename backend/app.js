const express = require("express");
const ErrorHandler = require("./middleware/error.js");
const app = express();
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const user = require("./controller/user.js");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // Replace with your client's origin
  credentials: true,
}));
app.use("/", express.static("uploads"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.use("/api/v2/user", user);

// middleWare for Error Handling
app.use(ErrorHandler);

module.exports = app;
