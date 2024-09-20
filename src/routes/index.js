const router = require("express").Router();
const {controllers:articleController}=require('../api/v1/article')

// articles
router
  .route("/api/v1/articles")
    .get(articleController.findAllItems)
    .post(articleController.createItem);

router
  .route("/api/v1/articles/:id")
    .get(articleController.findSingleItem)
    .put(articleController.updateItem)
    .patch(articleController.updateItemPatch)
    .delete(articleController.removeItem);

module.exports = router;
