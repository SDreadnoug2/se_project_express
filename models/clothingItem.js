const mongoose = require('mongoose');
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
      validator(v){
        return v.isURL(value);
      },
      message: "Please enter a valid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
module.exports = ClothingItem;
