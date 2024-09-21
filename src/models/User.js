const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
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
