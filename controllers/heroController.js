const HeroSlide = require("../models/HeroSlides");

const getHeroSlides = async (req, res) => {
  try {
    const heroSlides = await HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Hero slides fetched successfully",
      data: heroSlides
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero slides",
      error: error.message
    });
  }
};

const createHeroSlide = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, ctaText, ctaLink, order, isActive } = req.body;

    const newHeroSlide = await HeroSlide.create({
      title,
      subtitle,
      imageUrl,
      ctaText,
      ctaLink,
      order,
      isActive
    });

    return res.status(201).json({
      success: true,
      message: "Hero slide created successfully",
      data: newHeroSlide
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create hero slide",
      error: error.message
    });
  }
};

module.exports = {
  getHeroSlides,
  createHeroSlide
};