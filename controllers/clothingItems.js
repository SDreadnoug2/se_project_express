const Item = require('../models/clothingitem');

module.exports.getItems = (req, res) => {
  Item.find({}).then(items => {
    res.send({data: items}).catch(err => res.status(500).send({message: err}));
  })
}

module.exports.deleteItem = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(item => {
      if (!item) {
        return res.status(404).send({ message: 'Item does not exist or has already been deleted' });
      }
      res.send({ message: 'Item deleted successfully' });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  User.create({ name, weather, imageUrl, owner })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err }));
};

