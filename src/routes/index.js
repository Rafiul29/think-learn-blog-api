const router = require("express").Router();
const {controllers:articleController}=require('../api/v1/article')
const {controllers:authController}=require('../api/v1/auth')

const {controllers:articleControllerv2}=require('../api/v2/article')

// auth routes
router.post('/api/v1/auth/register',authController.register)
router.post('/api/v1/auth/login',authController.login)


// Articles routes
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

router.
  route("/api/v2/articles/:id")
   .patch(articleControllerv2.updatedItemPatch)

module.exports = router;
