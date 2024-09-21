const articleService = require("../../../../services/article");

const updateItemPatch = async (req, res, next) => {
  const id = req.params.id;

  try {
    const article = await articleService.updatePropertices(id, req.body);

    const response = {
      code: 200,
      message: "Article updated successfully",
      data: article,
      link: {
        self: `/articles/${article.id}`,
      },
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;
