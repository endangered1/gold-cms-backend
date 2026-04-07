const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      trim: true,
      default: ""
    },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    twitter: {
      type: String,
      trim: true,
      default: ""
    },
    instagram: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    tagline: {
      type: String,
      trim: true,
      default: ""
    },
    primaryEmail: {
      type: String,
      trim: true,
      default: ""
    },
    primaryPhone: {
      type: String,
      trim: true,
      default: ""
    },
    address: {
      type: String,
      trim: true,
      default: ""
    },
    logoUrl: {
      type: String,
      trim: true,
      default: ""
    },
    footerText: {
      type: String,
      trim: true,
      default: ""
    },
    socialLinks: {
      type: socialLinksSchema,
      default: () => ({})
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

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

module.exports = SiteSettings;