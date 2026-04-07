const Leadership = require("../models/Leadership");

// GET all active leadership members
const getLeadershipMembers = async (req, res) => {
  try {
    const leadershipMembers = await Leadership.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Leadership members fetched successfully",
      data: leadershipMembers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET single leadership member by slug
const getLeadershipMemberBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const leadershipMember = await Leadership.findOne({
      slug,
      isActive: true,
    });

    if (!leadershipMember) {
      return res.status(404).json({
        success: false,
        message: "Leadership member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leadership member fetched successfully",
      data: leadershipMember,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// POST create leadership member
const createLeadershipMember = async (req, res) => {
  try {
    const newLeadershipMember = new Leadership(req.body);
    const savedLeadershipMember = await newLeadershipMember.save();

    return res.status(201).json({
      success: true,
      message: "Leadership member created successfully",
      data: savedLeadershipMember,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getLeadershipMembers,
  getLeadershipMemberBySlug,
  createLeadershipMember,
};