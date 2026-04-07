const mongoose = require("mongoose");

const investorOverviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    introText: {
      type: String,
      required: true,
      trim: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    investorEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    investorPhone: {
      type: String,
      default: "",
      trim: true,
    },

    ctaText: {
      type: String,
      default: "",
      trim: true,
    },

    ctaLink: {
      type: String,
      default: "",
      trim: true,
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

const InvestorOverview = mongoose.model("InvestorOverview", investorOverviewSchema);

module.exports = InvestorOverview;