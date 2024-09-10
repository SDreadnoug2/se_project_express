const router = require("express").Router();
const auth = require('../middleware/auth');
const {clothingItemValidation, validateId} = require('../middleware/validation')
const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.use(auth);
router.delete("/:itemId", validateId, deleteItem);
router.post("/", clothingItemValidation,  createItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);
module.exports = router;
