const InvestorOverview = require("../models/InvestorOverview");

// GET active investor overview
const getInvestorOverview = async (req, res) => {
  try {
    const investorOverview = await InvestorOverview.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!investorOverview) {
      return res.status(404).json({
        success: false,
        message: "Investor overview not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Investor overview fetched successfully",
      data: investorOverview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// POST create investor overview
const createInvestorOverview = async (req, res) => {
  try {
    const newInvestorOverview = new InvestorOverview(req.body);
    const savedInvestorOverview = await newInvestorOverview.save();

    return res.status(201).json({
      success: true,
      message: "Investor overview created successfully",
      data: savedInvestorOverview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getInvestorOverview,
  createInvestorOverview,
};