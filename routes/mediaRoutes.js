const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  uploadMedia,
  getMedia
} = require("../controllers/mediaController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getMedia);
router.post(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  upload.single("file"),
  uploadMedia
);

module.exports = router;