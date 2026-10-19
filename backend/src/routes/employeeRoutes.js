
const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("EMPLOYEE"),
  (req, res) => {
    res.json({
      success: true,
      message: "Employee access granted",
      user: {
        id: req.user.id,
        fullName: req.user.fullName,
        role: req.user.role,
      },
    });
  }
);

module.exports = router;
