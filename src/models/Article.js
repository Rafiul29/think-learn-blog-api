const { model, Schema } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    body: {
      type: String,
      required: [true, "body is required"],
    },
    cover: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
  },
  { timestamps: true }
);

const Article = model("Article", articleSchema);
module.exports = Article;
