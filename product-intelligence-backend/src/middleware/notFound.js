module.exports = (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
    error: null,
  });
};