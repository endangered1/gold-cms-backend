const express = require("express");
const router = express.Router();

const {
  createContactSubmission,
  getContactSubmissions,
} = require("../controllers/contactSubmissionController");

router.post("/", createContactSubmission);
router.get("/", getContactSubmissions);

module.exports = router;