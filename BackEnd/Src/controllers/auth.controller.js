const UserModel = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//  Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      return res.status(400).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: User._id,
        email: User.email,
        role: User.role,
        loginTime: new Date().toISOString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        id: User._id,
        type: "refresh",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Set secure cookies
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    };

    const refreshCookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/",
    };

    // Set cookies
    res.cookie("token", token, cookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    // Update user's last login time
    User.lastLogin = new Date();
    await User.save();

    // Return success response
    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token: token,
        refreshToken: refreshToken,
        expiresIn: "7d",
        user: {
          id: User._id,
          name: User.name,
          email: User.email,
          role: User.role,
          lastLogin: User.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error during login",
    });
  }
};

//  SignUp Controller
const SignUp = async (req, res) => {
  let { name, email, password, phone, age } = req.body;

  const ExistingUser = await UserModel.findOne({ email: email });
  if (ExistingUser) {
    return res.status(400).json({ Message: "User Already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const NewUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    phone,
    age,
  });

  NewUser.save()
    .then(() => {
      res.status(200).json({ Message: "User Created Successfully" });
    })
    .catch((Err) => {
      res.status(500).json({ Message: "Error Creating User", Error: Err });
    });
};

// Logout Controller
const LogOut = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Clear all authentication cookies with proper options
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    };

    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("authToken", cookieOptions);

    // If token is provided, verify it and update user's logout time
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (user) {
          // Update user's last logout time (optional)
          user.lastLogout = new Date();
          await user.save();
          console.log(`User ${user.email} logged out successfully`);
        }
      } catch (error) {
        // Token is invalid/expired, but we still clear cookies
        console.log("Invalid token during logout, but cookies cleared");
      }
    }

    // Return success response
    res.status(200).json({
      status: true,
      message: "Logged Out Successfully",
      data: {
        logoutTime: new Date().toISOString(),
        message: "All sessions cleared",
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: false,
      message: "Error during logout",
    });
  }
};

// Get Current User Profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      country,
      education,
      Skills,
      Interests,
      Experience,
      Languages,
      Resume,
    } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.name = email;
    if (password) updateFields.name = password;
    if (phone) updateFields.phone = phone;
    if (age) updateFields.age = age;
    if (country) updateFields.country = country;
    if (education) updateFields.education = education;
    if (Skills) updateFields.Skills = Skills;
    if (Interests) updateFields.Interests = Interests;
    if (Experience) updateFields.Experience = Experience;
    if (Languages) updateFields.Languages = Languages;
    if (Resume) updateFields.Resume = Resume;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password - Generate Reset Token
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // In a real application, you would send this token via email
    // For now, we'll return it in the response (not recommended for production)
    res.status(200).json({
      status: true,
      message: "Password reset token generated",
      resetToken: resetToken, // Remove this in production
      expiresIn: "1 hour",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reset Password with Token
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Refresh Token
const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate new token
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      status: true,
      message: "Token refreshed successfully",
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User Account
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required to delete account" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Delete user
    await UserModel.findByIdAndDelete(req.user.id);

    res.status(200).json({
      status: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  Login,
  SignUp,
  LogOut,
  getCurrentUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
  deleteAccount,
};
