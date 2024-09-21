const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [5, "User name min length 5 characters"],
      maxLength: [50, "User name max length 50 characters"],
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
      unique: true,
      lowercase: true,
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
        8,
        "The length of user password can be minimum 8  characters",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
