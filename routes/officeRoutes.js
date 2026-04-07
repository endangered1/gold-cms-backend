const express = require("express");
const router = express.Router();

const {
  getOffices,
  createOffice,
} = require("../controllers/officeController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getOffices);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createOffice);

module.exports = router;