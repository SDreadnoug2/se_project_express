const Item = require("../models/clothingItem");
const errors = require("../utils/errors");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;
  Item.findById(itemId)
    .orFail(new Error("NotFound"))
    .then((item) => {
      if (item.owner.equals(userId)) {
        return Item.findByIdAndRemove(itemId)
          .then(() => res.send({ message: `Item ID: ${itemId} deleted successfully` }))
          .catch((err) => {
            console.error(err);
            return res
              .status(errors.SERVER_ERROR)
              .send({ message: "Internal Server Error" });
          });
      } else {
        return res
          .status(403)
          .send({ message: "You do not have permission to delete this item" });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res
          .status(errors.NOT_FOUND)
          .send({ message: "Item ID not found" });
      }
      if (err.kind === "ObjectId") {
        return res
          .status(errors.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(errors.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res
          .status(errors.NOT_FOUND)
          .send({ message: "Item ID not found" });
      }
      if (err.kind === "ObjectId") {
        return res
          .status(errors.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res
          .status(errors.NOT_FOUND)
          .send({ message: "Item ID not found" });
      }
      if (err.kind === "ObjectId") {
        // Ensure invalid ObjectId is handled
        return res
          .status(errors.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};
