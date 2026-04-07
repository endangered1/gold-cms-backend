const express = require("express");
const router = express.Router();

const {
  getHeroSlides,
  createHeroSlide
} = require("../controllers/heroController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getHeroSlides);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createHeroSlide);

module.exports = router;