const express = require("express");
const router = express.Router();

const {
  getLeadershipMembers,
  getLeadershipMemberBySlug,
  createLeadershipMember,
} = require("../controllers/leadershipController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getLeadershipMembers);
router.get("/:slug", getLeadershipMemberBySlug);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createLeadershipMember);

module.exports = router;