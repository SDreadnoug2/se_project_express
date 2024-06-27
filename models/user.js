const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v){
        return v.isURL(value);
      },
      message: "Please enter a valid URL.",
    },
  },
})

const user = mongoose.model('user', userSchema);
module.exports = user;