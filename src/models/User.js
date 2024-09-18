const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
      minLength: [3, "User name max length 31 characters"],
      maxLength: [31, "User name max length 31 characters"],
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

const User = model("User", UserSchema);
module.exports = User;
