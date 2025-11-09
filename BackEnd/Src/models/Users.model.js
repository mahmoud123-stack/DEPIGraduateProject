const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    country: {
      type: String,
    },

    education: [
      {
        degree: { String },
        university: { type: String },
        State: {
          type: String,
          enum: ["Fresh Graduate", "Under Graduate", "Junior", "Senior"],
        },
      },
    ],

    Skills: [
      {
        Technical: {
          name: { type: String },
          Level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Expert"],
            default: "Beginner",
          },
        },

        NonTechnical: {
          name: { type: String },
          Level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Expert"],
            default: "Beginner",
          },
        },
      },
    ],

    Interests: [],
    Experience: [],
    // Projects: [],
    // Certifications: [],
    Languages: [],
    // SocialMedia: [],
    Resume: { type: String },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    // Password reset fields
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },

    // Session management
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    lastLogout: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
//Export the model

module.exports = mongoose.model("User", userSchema);
