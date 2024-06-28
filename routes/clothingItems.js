const router = require('express').Router();
const { getItems, deleteItem, createItem, likeItem, dislikeItem } = require('../controllers/clothingItems');


router.get('/', getItems);
router.delete('/:itemId', deleteItem);
router.post('/', createItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
module.exports = router;

