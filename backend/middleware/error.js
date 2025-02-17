const ErrorHandler = require("../utilis/ErrorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handling Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    const message = `Resource not found with this id.. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handling Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate keys ${Object.keys(err.keyValue || {}).join(", ")} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handling Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(", ");
    err = new ErrorHandler(message, 400);
  }

  // Handling invalid JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid. Try again later!";
    err = new ErrorHandler(message, 400);
  }

  // Handling expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired. Try again later!";
    err = new ErrorHandler(message, 400);
  }

  // Sending response to the client
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};