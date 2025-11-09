const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Public Auth Routes
router.post("/login", AuthController.Login);
router.post("/signup", AuthController.SignUp);
router.post("/logout", AuthController.LogOut);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/refresh-token", AuthController.refreshToken);

// Protected Routes (require authentication)
router.get("/me", verifyToken, AuthController.getCurrentUser);
router.put("/profile", verifyToken, AuthController.updateProfile);
router.put("/change-password", verifyToken, AuthController.changePassword);
router.delete("/account", verifyToken, AuthController.deleteAccount);

module.exports = router;
    