const { model, Schema } = require("mongoose");

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "body is required"],
    },
    status: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
