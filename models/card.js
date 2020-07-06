const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        const regex = /(https?:\/\/)(www\.)?((((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9])\.((2[0-5][0-5])|(1\d\d)|(\d\d)|[0-9]))|([\w-]+(\.[\w-]+)(\.[a-zA-Z-]+)*))(:\d{2,5})?(\/[\w\-/]+#?)?\/?/gm;
        return regex.test(v);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
