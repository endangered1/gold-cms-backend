const express = require("express");
const router = express.Router();

const { createAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("superadmin"), createAdmin);

module.exports = router;