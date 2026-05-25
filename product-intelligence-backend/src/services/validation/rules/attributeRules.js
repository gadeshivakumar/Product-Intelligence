const validateAttributes = (
  product
) => {

  const issues = [];

  const missingAttributes = [];

  if (!product.brand) {
    missingAttributes.push("brand");
  }

  if (!product.color) {
    missingAttributes.push("color");
  }

  if (!product.material) {
    missingAttributes.push("material");
  }

  if (
    missingAttributes.length > 0
  ) {

    issues.push({
      issueType:
        "MISSING_ATTRIBUTES",

      severity: "MEDIUM",

      message:
        `Missing attributes: ${missingAttributes.join(", ")}`,

      suggestedFix:
        "Add important product attributes",
    });
  }

  if (
    !product.description ||
    product.description.length < 20
  ) {

    issues.push({
      issueType:
        "WEAK_DESCRIPTION",

      severity: "LOW",

      message:
        "Product description is weak",

      suggestedFix:
        "Add more detailed description",
    });
  }

  if (
    product.availability ===
    "out_of_stock"
  ) {

    issues.push({
      issueType:
        "OUT_OF_STOCK",

      severity: "LOW",

      message:
        "Product is out of stock",

      suggestedFix:
        "Restock product or notify operations",
    });
  }

  return issues;
};

module.exports = {
  validateAttributes,
};