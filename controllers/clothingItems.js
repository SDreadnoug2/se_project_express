const Item = require("../models/clothingItem");
const errors = require("../utils/errors");
const { NotFoundError, BadRequest, ServerError, NoPermission } = require("../utils/errors");

module.exports.getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      next(new ServerError('Server Error'));
    });
};

module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user.id;

  Item.findById(itemId)
    .orFail(() => {
      throw new NotFoundError('Item not found');
    })
    .then((item) => {
      if (!item.owner.equals(userId)) {
        throw new NoPermission('You do not have permission to delete this item');
      }

      return Item.findByIdAndRemove(itemId);
    })
    .then(() => res.send({ message: `Item ID: ${itemId} deleted successfully` }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Invalid Item ID'));
      } else {
        next(err);
      }
    });
};
module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user.id;
  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({item}))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new AuthError('Unable to Validate'))
      }
      else {
        next(err);
      }
    });
};

module.exports.likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Object Not Found");
      }
      return res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        next(err)
      }
      if (err.kind === "ObjectId") {
        next( new BadRequest('Bad Request on ObjectId'))
      }
      else {
        next(err)
      }
    });
};

module.exports.dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user.id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Object not found.')
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err instanceof "NotFound") {
        next(err)
      }
      if (err.kind === "ObjectId") {
        next(new BadRequest('Bad Object Request'))
      }
      else {
        next(err);
      }
    });
};
