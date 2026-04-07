const express = require("express");
const router = express.Router();

const {
  getInvestorResources,
  createInvestorResource,
} = require("../controllers/investorResourceController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getInvestorResources);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createInvestorResource);

module.exports = router;