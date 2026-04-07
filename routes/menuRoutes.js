const express = require("express");
const router = express.Router();

const {
  getNavigationMenu,
  createMenuItem
} = require("../controllers/menuController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getNavigationMenu);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createMenuItem);

module.exports = router;