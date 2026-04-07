const SiteSettings = require("../models/SiteSettings");

const getSiteSettings = async (req, res) => {
  try {
    const siteSettings = await SiteSettings.findOne({ isActive: true }).sort({ createdAt: -1 });

    if (!siteSettings) {
      return res.status(404).json({
        success: false,
        message: "Site settings not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Site settings fetched successfully",
      data: siteSettings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch site settings",
      error: error.message
    });
  }
};

const createSiteSettings = async (req, res) => {
  try {
    const {
      companyName,
      tagline,
      primaryEmail,
      primaryPhone,
      address,
      logoUrl,
      footerText,
      socialLinks,
      isActive
    } = req.body;

    const newSiteSettings = await SiteSettings.create({
      companyName,
      tagline,
      primaryEmail,
      primaryPhone,
      address,
      logoUrl,
      footerText,
      socialLinks,
      isActive
    });

    return res.status(201).json({
      success: true,
      message: "Site settings created successfully",
      data: newSiteSettings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create site settings",
      error: error.message
    });
  }
};

module.exports = {
  getSiteSettings,
  createSiteSettings
};