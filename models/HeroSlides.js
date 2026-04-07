const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      trim: true,
      default: ""
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ""
    },
    ctaText: {
      type: String,
      trim: true,
      default: ""
    },
    ctaLink: {
      type: String,
      trim: true,
      default: ""
    },
    order: {
      type: Number,
      default: 0
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

const HeroSlide = mongoose.model("HeroSlides", heroSlideSchema);

module.exports = HeroSlide;