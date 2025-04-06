const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

router.post("/login", verifyToken);

module.exports = router;
