const SEO = require("../models/SEO");

const getSEOByPageKey = async (req, res) => {
  try {
    const { pageKey } = req.params;

    const seoEntry = await SEO.findOne({
      pageKey: pageKey.toLowerCase(),
      isActive: true,
    });

    if (!seoEntry) {
      return res.status(404).json({
        success: false,
        message: "SEO entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SEO entry fetched successfully",
      data: seoEntry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createSEOEntry = async (req, res) => {
  try {
    const newSEOEntry = new SEO(req.body);
    const savedSEOEntry = await newSEOEntry.save();

    return res.status(201).json({
      success: true,
      message: "SEO entry created successfully",
      data: savedSEOEntry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getSEOByPageKey,
  createSEOEntry,
};