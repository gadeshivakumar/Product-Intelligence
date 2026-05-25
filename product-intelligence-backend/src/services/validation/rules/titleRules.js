const validateTitle = (product) => {

  const issues = [];

  if (
    !product.productTitle ||
    product.productTitle.trim() === ""
  ) {

    issues.push({
      issueType: "MISSING_TITLE",

      severity: "HIGH",

      message:
        "Product title is missing",

      suggestedFix:
        "Add a clear product title",
    });

    return issues;
  }

  if (
    product.productTitle.length < 15
  ) {

    issues.push({
      issueType: "SHORT_TITLE",

      severity: "MEDIUM",

      message:
        "Product title is too short",

      suggestedFix:
        "Add brand, product type, color, or attributes",
    });
  }

  return issues;
};

module.exports = {
  validateTitle,
};