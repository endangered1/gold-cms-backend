const express = require("express");
const router = express.Router();

const {
  getSEOByPageKey,
  createSEOEntry,
} = require("../controllers/seoController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/:pageKey", getSEOByPageKey);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createSEOEntry);

module.exports = router;