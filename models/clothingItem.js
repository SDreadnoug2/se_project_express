const mongoose = require('mongoose');
const validator = require('validator');
const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'cold','warm']
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Please enter a valid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
module.exports = ClothingItem;
