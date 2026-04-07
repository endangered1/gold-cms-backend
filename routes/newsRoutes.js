const express = require("express");
const router = express.Router();

const {
  getNewsPosts,
  getNewsPostBySlug,
  createNewsPost,
} = require("../controllers/newsController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getNewsPosts);
router.get("/:slug", getNewsPostBySlug);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createNewsPost);

module.exports = router;