const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const regex = /(https?:\/\/)(www\.)?((((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9]))|([\w-]+(\.[\w-]+)(\.[a-zA-Z-]+)*))(:\d{2,5})?(\/[\w\-/]+#?)?\/?/gm;
        return regex.test(v);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
