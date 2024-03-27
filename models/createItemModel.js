const mongoose = require("mongoose");

const Item = mongoose.model("Item", {
  title: String,
  imageUrl: String,
  description: String,
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  unlikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  reviews: [
    {
      review: String,

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  rating: Number,
  price: Number,
});

module.exports = Item;

