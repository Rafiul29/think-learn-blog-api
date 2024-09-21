const router = require("express").Router();

// 
const authMiddleWare = require("../middleware/auth");

//controller v1
const { controllers: articleController } = require("../api/v1/article");
const { controllers: authController } = require("../api/v1/auth");

//controller v2
const { controllers: articleControllerv2 } = require("../api/v2/article");

// auth routes
router.post("/api/v1/auth/register", authController.register);
router.post("/api/v1/auth/login", authController.login);

// Articles routes
router
  .route("/api/v1/articles")
  .get(articleController.findAllItems)
  .post(
    authMiddleWare.authenticate,
    authMiddleWare.authorize(["admin", "user"]),
    articleController.createItem
  );

router
  .route("/api/v1/articles/:id")
  .get(articleController.findSingleItem)
  .put(
    authMiddleWare.authenticate,
    authMiddleWare.authorize(["admin", "user"]),
    articleController.updateItem
  )
  .patch(
    authMiddleWare.authenticate,
    authMiddleWare.authorize(["admin", "user"]),
    articleController.updateItemPatch
  )
  .delete(
    authMiddleWare.authenticate,
    authMiddleWare.authorize(["admin","user"]),
    authMiddleWare.ownership("Article"),
    articleController.removeItem
  );

router
  .route("/api/v2/articles/:id")
  .patch(articleControllerv2.updatedItemPatch);

module.exports = router;
