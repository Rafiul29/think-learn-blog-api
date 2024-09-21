const articleService = require("../../../../services/article");

const removeItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await articleService.removeItem(id);

    console.log(data)
    res.status(204).json({ message: "Article delete successfully" });

  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
