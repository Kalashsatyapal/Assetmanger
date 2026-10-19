
const express = require("express");
const rateLimit = require("express-rate-limit");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Try again later.",
  },
});

router.post(
  "/register",
  authLimiter,
  asyncHandler(authController.register)
);

router.post(
  "/login",
  authLimiter,
  asyncHandler(authController.login)
);

router.get(
  "/me",
  authenticate,
  asyncHandler(authController.me)
);

module.exports = router;
