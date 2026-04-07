const express = require("express");
const router = express.Router();

const {
  getSiteSettings,
  createSiteSettings
} = require("../controllers/siteSettingsController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getSiteSettings);
router.post("/", createSiteSettings);

module.exports = router;