const ESG = require("../models/ESG");

const getESG = async (req, res) => {
  try {
    const esg = await ESG.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!esg) {
      return res.status(404).json({
        success: false,
        message: "ESG content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ESG content fetched successfully",
      data: esg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createESG = async (req, res) => {
  try {
    const newESG = new ESG(req.body);
    const savedESG = await newESG.save();

    return res.status(201).json({
      success: true,
      message: "ESG content created successfully",
      data: savedESG,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getESG,
  createESG,
};