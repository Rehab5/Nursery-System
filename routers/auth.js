// authRoute.js
const express = require("express");
const controller = require("./../controllers/authController");
const validator = require("./../MiddleWare/authVal");
const router = express.Router();

router.post("/login", controller.login);

// Example usage of role-based authorization
router.get("/admin-route", validator.isAuthorized("teacher"), (req, res) => {
    // Handle admin route logic here
    res.json({ message: "Admin route accessed successfully" });
});

router.get("/user-route", validator.isAuthorized("child"), (req, res) => {
    // Handle user route logic here
    res.json({ message: "User route accessed successfully" });
});

module.exports = router;
