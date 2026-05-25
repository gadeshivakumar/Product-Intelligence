const prisma = require("../config/prisma");

const { validateTitle } = require("./validation/rules/titleRules");

const { validatePrice } = require("./validation/rules/priceRules");

const { validateImage } = require("./validation/rules/imageRules");

const { validateAttributes } = require("./validation/rules/attributeRules");

const { generateValidationAlerts } = require("./alertService");

const calculateQualityScore = (issues) => {
  let score = 100;

  for (const issue of issues) {
    if (issue.severity === "HIGH") {
      score -= 25;
    }

    if (issue.severity === "MEDIUM") {
      score -= 10;
    }

    if (issue.severity === "LOW") {
      score -= 5;
    }
  }

  return Math.max(score, 0);
};

const validateProduct = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prisma.productIssue.deleteMany({
    where: {
      productId,
    },
  });

  const issues = [
    ...validateTitle(product),

    ...validatePrice(product),

    ...validateImage(product),

    ...validateAttributes(product),
  ];

  if (product.skuId) {
    const duplicateProducts = await prisma.product.findMany({
      where: {
        skuId: product.skuId,

        NOT: {
          id: product.id,
        },
      },
    });

    if (duplicateProducts.length > 0) {
      issues.push({
        issueType: "DUPLICATE_SKU",

        severity: "HIGH",

        message: "Duplicate SKU detected",

        suggestedFix: "Use unique SKU IDs",
      });
    }
  }

  if (issues.length > 0) {
    await prisma.productIssue.createMany({
      data: issues.map((issue) => ({
        productId,

        issueType: issue.issueType,

        severity: issue.severity,

        message: issue.message,

        suggestedFix: issue.suggestedFix,
      })),
    });

    await generateValidationAlerts(productId, issues);
  }

  const qualityScore = calculateQualityScore(issues);

  await prisma.product.update({
    where: {
      id: productId,
    },

    data: {
      listingQualityScore: qualityScore,

      validationStatus: issues.length > 0 ? "FAILED" : "PASSED",
    },
  });

  return {
    totalIssues: issues.length,

    qualityScore,

    issues,
  };
};

const getProductIssues = async (skuId) => {
  const product = await prisma.product.findUnique({
    where: {
      skuId,
    },

    include: {
      issues: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product.issues;
};

module.exports = {
  validateProduct,

  getProductIssues,
};
