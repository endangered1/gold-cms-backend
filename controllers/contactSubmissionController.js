const ContactSubmission = require("../models/ContactSubmission");

const createContactSubmission = async (req, res) => {
  try {
    const newSubmission = new ContactSubmission(req.body);
    const savedSubmission = await newSubmission.save();

    return res.status(201).json({
      success: true,
      message: "Contact submission created successfully",
      data: savedSubmission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Contact submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createContactSubmission,
  getContactSubmissions,
};