const Menu = require("../models/Menu");

const getNavigationMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .populate("parent", "title path");

    return res.status(200).json({
      success: true,
      message: "Navigation menu fetched successfully",
      data: menuItems
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch navigation menu",
      error: error.message
    });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { title, path, order, parent, isActive } = req.body;

    const newMenuItem = await Menu.create({
      title,
      path,
      order,
      parent,
      isActive
    });

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: newMenuItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message
    });
  }
};

module.exports = {
  getNavigationMenu,
  createMenuItem
};