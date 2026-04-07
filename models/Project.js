const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    region: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "completed", "upcoming"],
      default: "active",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;