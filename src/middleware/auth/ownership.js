const { authorizationError } = require("../../utils/error");
const articleService = require("../../services/article");

const ownership =
  (model = "") =>
  async (req, _res, next) => {
    try {
      if (model === "Article") {
        const isOwner = await articleService.checkOwnerShip({
          reqsourceId: req.params.id,
          userId: req.user.id,
        });
     
        if (isOwner) {
          return next();
        }
        return next(authorizationError());
      }
    } catch (e) {
      next(e);
    }
  };

module.exports = ownership;
