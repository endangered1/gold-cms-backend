const getHealthStatus = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gold Backend is running.",
            environment: process.env.NODE_ENV || "development"
        });
    }   catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getHealthStatus
};