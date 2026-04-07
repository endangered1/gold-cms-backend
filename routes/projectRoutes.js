const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

router.post("/", protect, authorizeRoles("admin", "superadmin"), createProject);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateProject);
router.delete("/:id", protect, authorizeRoles("admin", "superadmin"), deleteProject);

module.exports = router;