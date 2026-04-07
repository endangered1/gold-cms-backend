const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getServices);
router.get("/:slug", getServiceBySlug);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createService);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateService);
router.delete("/:id", protect, authorizeRoles("admin", "superadmin"), deleteService);

module.exports = router;