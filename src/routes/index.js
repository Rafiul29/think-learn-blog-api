const router = require("express").Router();
const {controllers:articleController}=require('../api/v1/article')

// articles
router
  .route("/api/v1/articles")
    .get(articleController.findAll)
    .post(articleController.create);

router
  .route("/api/v1/articles")
    .get()
    .put()
    .patch()
    .delete();

module.exports = router;
