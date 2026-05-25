const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  getAlerts,
  getAlertById,
  markAlertAsRead,
} = require("../services/alertService");

const getAllAlerts =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await getAlerts(
          req.query
        );

      return successResponse(
        res,
        "Alerts fetched successfully",
        result
      );

    } catch (error) {
      next(error);
    }
  };

const getSingleAlert =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { alertId } =
        req.params;

      const alert =
        await getAlertById(
          alertId
        );

      if (!alert) {

        return errorResponse(
          res,
          "Alert not found",
          null,
          404
        );
      }

      return successResponse(
        res,
        "Alert fetched successfully",
        alert
      );

    } catch (error) {
      next(error);
    }
  };

const markAsRead =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { alertId } =
        req.params;

      const updatedAlert =
        await markAlertAsRead(
          alertId
        );

      return successResponse(
        res,
        "Alert marked as read",
        updatedAlert
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message,
        null,
        404
      );
    }
  };

module.exports = {
  getAllAlerts,

  getSingleAlert,

  markAsRead,
};