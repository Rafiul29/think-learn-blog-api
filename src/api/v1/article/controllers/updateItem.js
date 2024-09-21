const articleService = require("../../../../services/article");

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const cover = req.body.cover || "";
  const status = req.body.status || "";

  try {
    const { article, status:code } = await articleService.updateOrCreate(id, {
      title: req.body.title,
      body: req.body.body,
      cover,
      status,
      author: req.user,
    });

    const response = {
      code,
      message:
      code == 200
          ? "Article updated Successfully"
          : "Article Created Successfully",
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

module.exports = updateItem;
