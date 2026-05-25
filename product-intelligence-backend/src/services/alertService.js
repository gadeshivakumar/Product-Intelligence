const prisma = require("../config/prisma");

const createAlert = async ({
  productId,
  severity,
  alertType,
  message,
}) => {

  return prisma.alert.create({
    data: {
      productId,

      severity,

      alertType,

      message,
    },
  });
};

const generateValidationAlerts =
  async (
    productId,
    issues
  ) => {

    const alerts = [];

    for (const issue of issues) {

      const existingAlert =
        await prisma.alert.findFirst({
          where: {
            productId,

            alertType:
              issue.issueType,

            message:
              issue.message,
          },
        });

      if (existingAlert) {
        continue;
      }

      const alert =
        await createAlert({
          productId,

          severity:
            issue.severity,

          alertType:
            issue.issueType,

          message:
            issue.message,
        });

      alerts.push(alert);
    }

    return alerts;
  };

const generatePriceAlert =
  async ({
    productId,
    percentageDifference,
  }) => {

    if (
      percentageDifference <= 10
    ) {

      return null;
    }

    const existingAlert =
      await prisma.alert.findFirst({
        where: {
          productId,

          alertType:
            "PRICE_GAP",
        },
      });

    if (existingAlert) {
      return existingAlert;
    }

    return createAlert({
      productId,

      severity: "HIGH",

      alertType: "PRICE_GAP",

      message:
        `Product price is ${percentageDifference}% higher than competitor pricing`,
    });
  };

const getAlerts = async ({
  page = 1,
  limit = 10,
  severity,
  readStatus,
}) => {

  const skip =
    (page - 1) * limit;

  const where = {};

  if (severity) {
    where.severity =
      severity;
  }

  if (readStatus) {
    where.readStatus =
      readStatus;
  }

  const [alerts, total] =
    await Promise.all([
      prisma.alert.findMany({
        where,

        skip,

        take:
          Number(limit),

        orderBy: {
          createdAt:
            "desc",
        },

        include: {
          product: {
            select: {
              skuId: true,

              productTitle: true,

              brand: true,
            },
          },
        },
      }),

      prisma.alert.count({
        where,
      }),
    ]);

  return {
    alerts,

    pagination: {
      total,

      page:
        Number(page),

      limit:
        Number(limit),

      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
};

const getAlertById =
  async (alertId) => {

    return prisma.alert.findUnique({
      where: {
        id: alertId,
      },

      include: {
        product: true,
      },
    });
  };

const markAlertAsRead =
  async (alertId) => {

    return prisma.alert.update({
      where: {
        id: alertId,
      },

      data: {
        readStatus:
          "READ",
      },
    });
  };

module.exports = {
  createAlert,

  generateValidationAlerts,

  generatePriceAlert,

  getAlerts,

  getAlertById,

  markAlertAsRead,
};