const Admin = require("../models/Admin");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
        data: null,
      });
    }

    if (role && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Only admin role can be created from this endpoint",
        data: null,
      });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
        data: null,
      });
    }

    const newAdmin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        isActive: newAdmin.isActive,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
};