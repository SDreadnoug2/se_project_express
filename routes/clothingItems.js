const router = require("express").Router();
const auth = require('../middleware/auth');

const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");


router.use(auth);
router.get("/", getItems);
router.delete("/:itemId", deleteItem);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
module.exports = router;
