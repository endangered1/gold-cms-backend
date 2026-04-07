const express = require("express");
const router = express.Router();

const {
  getInvestorOverview,
  createInvestorOverview,
} = require("../controllers/investorOverviewController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getInvestorOverview);
router.post("/", protect, authorizeRoles("admin", "superadmin"),  createInvestorOverview);

module.exports = router;