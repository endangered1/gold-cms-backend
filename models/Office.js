const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema(
  {
    officeName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    mapUrl: {
      type: String,
      default: "",
      trim: true,
    },

    workingHours: {
      type: String,
      default: "",
      trim: true,
    },

    inquiryEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
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

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;