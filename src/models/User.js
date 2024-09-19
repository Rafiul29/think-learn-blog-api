const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [
        6,
        "The length of user password can be minimum 6  characters",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approve", "declined", "block"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
