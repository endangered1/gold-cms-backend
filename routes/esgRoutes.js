const express = require("express");
const router = express.Router();

const {
  getESG,
  createESG,
} = require("../controllers/esgController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getESG);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createESG);

module.exports = router;