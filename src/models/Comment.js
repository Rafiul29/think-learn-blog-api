const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "body is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null }, // For replies
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;
