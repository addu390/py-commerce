const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

const Favorites = new mongoose.model("favorites", favoritesSchema, "favorites");

module.exports = Favorites;
