const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user.js");
const { upload } = require("../multer.js");
const ErrorHandler = require("../utilis/ErrorHandler.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utilis/sendMail.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utilis/jwtToken.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const UserEmail = await User.findOne({ email });

    if (UserEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: fileUrl,
        public_id: filename,
      },
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `${process.env.CLIENT_URL}/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Account Activation Link",
        message: `Hello ${user.name}, Please click on the link to activate your account. ${activationUrl}`,
      });

      res.status(200).json({
        success: true,
        message: `Account created successfully, Please check your email : ${user.email} to activate your account`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500)); // Pass the error to the error-handling middleware
    }
  } catch (err) {
    return next(new ErrorHandler(err.message), 400); // Pass the error to the error-handling middleware
  }
});

// create Activation Token

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    const { activation_token } = req.body;
    try {
      jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET,
        async (err, result) => {
          if (err) {
            return next(new ErrorHandler("Token Expired or Invalid", 400));
          }
          const { name, email, password, avatar } = result;
          let user = await User.findOne({ email });

          if (user) {
            return next(new ErrorHandler("User already exists", 400));
          }
          user = await User.create({
            name,
            email,
            avatar,
            password,
          });

          sendToken(user, 201, res);
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load User

router.get(
  "/getuser",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User does not exists", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
