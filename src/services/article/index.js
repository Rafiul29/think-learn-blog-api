const { Article } = require("../../models");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");

/**
 * find all articles
 * paginations
 * searching
 * sorting
 * @param {*} param0
 * @returns
 */
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const filter = { title: { $regex: ".*" + search + ".*", $options: "i" } };

  const articles = await Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return articles.map((article) => ({
    ...article._doc,
    id: article.id,
  }));
};

/**
 * count all items
 * @param {*} param0
 * @returns
 */
const count = ({ search = "" }) => {
  const filter = { title: { $regex: ".*" + search + ".*", $options: "i" } };
  return Article.countDocuments(filter);
};

/**
 * create a new article
 * @param {*} param0
 * @returns
 */
const create = async ({
  title,
  body,
  cover = "",
  status = "draft",
  author,
}) => {
  if (!title || !body || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }
  const article = new Article({
    title,
    body,
    cover,
    status,
    author: author.id,
  });
  await article.save();
  return {
    ...article._doc,
    id: article.id,
  };
};

/**
 * find a single article
 * @param {*} param0
 * @returns
 */
const findSingleItem = async ({ id, expand = "" }) => {
  if (!id) {
    throw new Error("Id is required");
  }

  expand = expand.split(",").map((item) => item.trim());

  const article = await Article.findById(id);

  if (!article) {
    throw notFound("Article Not Found");
  }

  if (expand.includes("author")) {
    await article.populate({
      path: "author",
      select: "name",
      strictPopulate:false
    });
  }

  if (expand.includes("comments")) {
    console.log("lis");
    await article.populate({
      path: "comments",
      strictPopulate:false
    });
  }

  return {
    ...article._doc,
    id: article.id,
  };
};

/**
 * update or create an article
 * @param {*} id
 * @param {*} param1
 */

const updateOrCreate = async (
  id,
  { title, body, author, cover = "", status = "daraft" }
) => {
  const article = await Article.findById(id);
  if (!article) {
    const article = await create({ title, body, cover, status, author });

    return {
      article,
      status: 201,
    };
  }

  const payload = {
    title,
    body,
    cover,
    status,
    author: author.id,
  };

  article.overwrite(payload);
  await article.save();
  // Article.replaceOne({id},{payload})
  return {
    article: { ...article._doc, id: article.id },
    status: 200,
  };
};

const updatePropertices = async (id, { title, body, cover, status }) => {
  if (!id) {
    throw new Error("Id is required");
  }

  const article = await Article.findById(id);

  if (!article) {
    throw notFound("Article Not Found");
  }

  const payload = {
    title,
    body,
    cover,
    status,
  };

  // first way
  // article.title = title ?? article.title;
  // article.body = body ?? article.body;
  // article.cover = cover ?? article.cover;
  // article.status = status ?? article.status;

  // second way
  Object.keys(payload).forEach((key)=>{
    article[key]=payload[key] ?? article[key]
  })

  await article.save();

  return {
    ...article._doc,
    id: article.id,
  };
};

const removeItem=async(id)=>{
  if (!id) {
    throw new Error("Id is required");
  }

  const article = await Article.findById(id);

  if (!article) {
    throw notFound("Article Not Found");
  }

  // TODO:
  // Asynchronously delete all associated comments
  // Commnet.deleteMany(article:id)
  
  return Article.findByIdAndDelete(id)
   
}

module.exports = {
  findAll,
  create,
  count,
  findSingleItem,
  updateOrCreate,
  updatePropertices,
  removeItem
};
