const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Media = require("../models/Media");

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = "gold-media") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// POST upload media
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadedFile = await uploadToCloudinary(req.file.buffer);

    const newMedia = new Media({
      originalName: req.file.originalname,
      publicId: uploadedFile.public_id,
      fileUrl: uploadedFile.secure_url,
      resourceType: uploadedFile.resource_type,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: "admin",
    });

    const savedMedia = await newMedia.save();

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: savedMedia,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET all media
const getMedia = async (req, res) => {
  try {
    const mediaFiles = await Media.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Media files fetched successfully",
      data: mediaFiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  uploadMedia,
  getMedia,
};