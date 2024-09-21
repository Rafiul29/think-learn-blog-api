const articleService = require("../../../../services/article");

const createItem = async (req, res, next) => {
  const { title, body, cover, status } = req.body;
  try {
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author: req.user,
    });

    //generate response
    const response = {
      code: 201,
      message: "Article created successfully",
      data: article,
      links: {
        self: `/articles/${article.id}`,
        author: `/articles/${article.id}/author`,
        comments: `/articles/${article.id}/comments`,
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createItem;
