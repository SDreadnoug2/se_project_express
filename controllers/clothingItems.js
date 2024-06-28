const Item = require("../models/clothingItem");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports.deleteItem = (req, res) => {
  Item.findByIdAndRemove(req.params.itemId)
    .orFail(new Error("NotFound"))
    .then((item) =>
      res.send({ message: `Item ID: ${item._id} deleted successfully` })
    )
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        res.status(404).send({ message: "Item ID not found" });
      } else if (err.kind === "ObjectId") {
        return res.status(400).send({ message: "Invalid Item ID" });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
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
        res.status(400).send({ message: "Invalid data" });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
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
        res.status(404).send({ message: "Item ID not found" });
      } else if (err.kind === "ObjectId") {
        // Ensure invalid ObjectId is handled
        return res.status(400).send({ message: "Invalid Item ID" });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
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
        res.status(404).send({ message: "Item ID not found" });
      } else if (err.kind === "ObjectId") {
        // Ensure invalid ObjectId is handled
        return res.status(400).send({ message: "Invalid Item ID" });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
};
