const prisma = require("../config/prisma");

const healthCheck = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      message: "Server is healthy",
      data: {
        uptime: process.uptime(),
        database: "connected",
        timestamp: new Date(),
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Health check failed",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  healthCheck,
};