const prisma = require("../config/prisma");

const getDashboardSummary =
  async () => {

    const totalProducts =
      await prisma.product.count();

    const totalIssues =
      await prisma.productIssue.count();

    const totalAlerts =
      await prisma.alert.count();

    const highSeverityIssues =
      await prisma.productIssue.count({
        where: {
          severity: "HIGH",
        },
      });

    const mediumSeverityIssues =
      await prisma.productIssue.count({
        where: {
          severity: "MEDIUM",
        },
      });

    const lowSeverityIssues =
      await prisma.productIssue.count({
        where: {
          severity: "LOW",
        },
      });

    const missingImageCount =
      await prisma.productIssue.count({
        where: {
          issueType:
            "MISSING_IMAGE",
        },
      });

    const invalidPriceCount =
      await prisma.productIssue.count({
        where: {
          issueType:
            "INVALID_PRICE",
        },
      });

    const duplicateSKUCount =
      await prisma.productIssue.count({
        where: {
          issueType:
            "DUPLICATE_SKU",
        },
      });

    const outOfStockCount =
      await prisma.product.count({
        where: {
          availability:
            "out_of_stock",
        },
      });

    const unreadAlerts =
      await prisma.alert.count({
        where: {
          readStatus:
            "UNREAD",
        },
      });

    const products =
      await prisma.product.findMany({
        select: {
          listingQualityScore:
            true,

          price: true,

          competitorPrices: {
            select: {
              competitorPrice:
                true,
            },
          },
        },
      });

    let averageQualityScore =
      0;

    if (
      products.length > 0
    ) {

      averageQualityScore =
        products.reduce(
          (sum, product) =>
            sum +
            (
              product.listingQualityScore ||
              0
            ),
          0
        ) /
        products.length;
    }

    const pricingInsights =
      products.map(
        (product) => {

          if (
            !product.price ||
            product
              .competitorPrices
              .length === 0
          ) {

            return null;
          }

          const competitorPrices =
            product.competitorPrices.map(
              (p) =>
                p.competitorPrice
            );

          const lowest =
            Math.min(
              ...competitorPrices
            );

          const percentageDifference =
            (
              ((product.price -
                lowest) /
                lowest) *
              100
            ).toFixed(2);

          return {
            ourPrice:
              product.price,

            lowestCompetitorPrice:
              lowest,

            percentageDifference:
              Number(
                percentageDifference
              ),
          };
        }
      ).filter(Boolean);

    const averagePriceDifference =
      pricingInsights.length > 0
        ? pricingInsights.reduce(
            (
              sum,
              item
            ) =>
              sum +
              item.percentageDifference,
            0
          ) /
          pricingInsights.length
        : 0;

    return {
      products: {
        total:
          totalProducts,

        outOfStock:
          outOfStockCount,
      },

      issues: {
        total:
          totalIssues,

        highSeverity:
          highSeverityIssues,

        mediumSeverity:
          mediumSeverityIssues,

        lowSeverity:
          lowSeverityIssues,

        missingImages:
          missingImageCount,

        invalidPrices:
          invalidPriceCount,

        duplicateSKUs:
          duplicateSKUCount,
      },

      alerts: {
        total:
          totalAlerts,

        unread:
          unreadAlerts,
      },

      quality: {
        averageScore:
          Number(
            averageQualityScore.toFixed(
              2
            )
          ),
      },

      pricing: {
        averageMarketDifference:
          Number(
            averagePriceDifference.toFixed(
              2
            )
          ),
      },
    };
  };

module.exports = {
  getDashboardSummary,
};