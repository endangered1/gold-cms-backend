const Office = require("../models/Office");

// GET all active offices
const getOffices = async (req, res) => {
  try {
    const offices = await Office.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Offices fetched successfully",
      data: offices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// POST create office
const createOffice = async (req, res) => {
  try {
    const newOffice = new Office(req.body);
    const savedOffice = await newOffice.save();

    return res.status(201).json({
      success: true,
      message: "Office created successfully",
      data: savedOffice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getOffices,
  createOffice,
};