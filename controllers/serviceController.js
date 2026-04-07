const slugify = require("slugify");
const Service = require("../models/Service");

const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      data: null
    });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({ slug, isActive: true });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      data: null
    });
  }
};

const createService = async (req, res) => {
  try {
    const { title, shortDescription } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
        data: null
      });
    }

    if (!shortDescription || !shortDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Short description is required",
        data: null
      });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingService = await Service.findOne({ slug });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "A service with this title already exists",
        data: null
      });
    }

    const service = await Service.create({
      ...req.body,
      slug
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      data: null
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDescription, fullDescription, imageUrl, iconUrl, order, isActive } = req.body;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
        data: null
      });
    }

    if (title && title.trim()) {
      const newSlug = slugify(title, { lower: true, strict: true });

      const existingService = await Service.findOne({
        slug: newSlug,
        _id: { $ne: id }
      });

      if (existingService) {
        return res.status(400).json({
          success: false,
          message: "Another service with this title already exists",
          data: null
        });
      }

      service.title = title;
      service.slug = newSlug;
    }

    if (shortDescription !== undefined) {
      if (!shortDescription || !shortDescription.trim()) {
        return res.status(400).json({
          success: false,
          message: "Short description cannot be empty",
          data: null
        });
      }

      service.shortDescription = shortDescription;
    }

    if (fullDescription !== undefined) {
      service.fullDescription = fullDescription;
    }

    if (imageUrl !== undefined) {
      service.imageUrl = imageUrl;
    }

    if (iconUrl !== undefined) {
      service.iconUrl = iconUrl;
    }

    if (order !== undefined) {
      service.order = order;
    }

    if (isActive !== undefined) {
      service.isActive = isActive;
    }

    const updatedService = await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update service",
      data: null
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
        data: null
      });
    }

    service.isActive = false;
    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
      data: null
    });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
};