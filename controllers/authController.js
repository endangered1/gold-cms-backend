const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const bootstrapSuperAdmin = async (req, res) => {
  try {
    const existingSuperAdmin = await Admin.findOne({ role: "superadmin" });

    if (existingSuperAdmin) {
      return res.status(400).json({
        success: false,
        message: "Superadmin already exists",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const newSuperAdmin = new Admin({
      name,
      email: email.toLowerCase(),
      password,
      role: "superadmin",
    });

    const savedSuperAdmin = await newSuperAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Superadmin created successfully",
      data: {
        id: savedSuperAdmin._id,
        name: savedSuperAdmin.name,
        email: savedSuperAdmin.email,
        role: savedSuperAdmin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
      isActive: true,
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin profile fetched successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  bootstrapSuperAdmin,
  loginAdmin,
  getMe,
};