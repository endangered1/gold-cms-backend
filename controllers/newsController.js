const News = require("../models/News");

const getNewsPosts = async (req, res) => {
  try {
    const newsPosts = await News.find({ isActive: true }).sort({
      order: 1,
      publishedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "News posts fetched successfully",
      data: newsPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getNewsPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const newsPost = await News.findOne({ slug, isActive: true });

    if (!newsPost) {
      return res.status(404).json({
        success: false,
        message: "News post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "News post fetched successfully",
      data: newsPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createNewsPost = async (req, res) => {
  try {
    const newNewsPost = new News(req.body);
    const savedNewsPost = await newNewsPost.save();

    return res.status(201).json({
      success: true,
      message: "News post created successfully",
      data: savedNewsPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getNewsPosts,
  getNewsPostBySlug,
  createNewsPost,
};