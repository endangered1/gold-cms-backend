const slugify = require("slugify");
const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      data: null,
    });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ slug, isActive: true });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      data: null,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const existingProject = await Project.findOne({
      title: req.body.title,
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project with this title already exists",
        data: null,
      });
    }

    const projectData = {
      ...req.body,
    };

    if (req.body.title) {
      projectData.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const newProject = new Project(projectData);
    const savedProject = await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      data: null,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.body.title) {
      const existingProject = await Project.findOne({
        title: req.body.title,
        _id: { $ne: id },
      });

      if (existingProject) {
        return res.status(400).json({
          success: false,
          message: "Project with this title already exists",
          data: null,
        });
      }

      updateData.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      data: null,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    project.isActive = false;
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      data: null,
    });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};