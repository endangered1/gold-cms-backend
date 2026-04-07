const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/healthRoutes");
const siteSettingsRoutes = require("./routes/siteSettingsRoutes");
const menuRoutes = require("./routes/menuRoutes");
const heroRoutes = require("./routes/heroRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const leadershipRoutes = require("./routes/leadershipRoutes");
const newsRoutes = require("./routes/newsRoutes");
const investorOverviewRoutes = require("./routes/investorOverviewRoutes");
const investorResourceRoutes = require("./routes/investorResourceRoutes");
const officeRoutes = require("./routes/officeRoutes");
const contactSubmissionRoutes = require("./routes/contactSubmissionRoutes");
const esgRoutes = require("./routes/esgRoutes");
const seoRoutes = require("./routes/seoRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/health", healthRoutes);
app.use("/api/site/settings", siteSettingsRoutes);
app.use("/api/navigation", menuRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/leadership", leadershipRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/investors/overview", investorOverviewRoutes);
app.use("/api/investors/resources", investorResourceRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/contact", contactSubmissionRoutes);
app.use("/api/esg", esgRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api", mediaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);


app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "GOLD backend API is running"
  });
});

app.use("/api/health", healthRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;