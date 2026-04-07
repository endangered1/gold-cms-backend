const mongoose = require("mongoose");

const esgSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    introText: {
      type: String,
      default: "",
      trim: true,
    },

    environmentalContent: {
      type: String,
      default: "",
      trim: true,
    },

    socialContent: {
      type: String,
      default: "",
      trim: true,
    },

    governanceContent: {
      type: String,
      default: "",
      trim: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ESG = mongoose.model("ESG", esgSchema);

module.exports = ESG;