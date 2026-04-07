const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    path: {
      type: String,
      required: true,
      trim: true
    },

    order: {
      type: Number,
      default: 0
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;