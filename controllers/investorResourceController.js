const InvestorResource = require("../models/InvestorResource");

// GET all active investor resources
const getInvestorResources = async (req, res) => {
  try {
    const investorResources = await InvestorResource.find({ isActive: true }).sort({
      order: 1,
      publishDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Investor resources fetched successfully",
      data: investorResources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// POST create investor resource
const createInvestorResource = async (req, res) => {
  try {
    const newInvestorResource = new InvestorResource(req.body);
    const savedInvestorResource = await newInvestorResource.save();

    return res.status(201).json({
      success: true,
      message: "Investor resource created successfully",
      data: savedInvestorResource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getInvestorResources,
  createInvestorResource,
};