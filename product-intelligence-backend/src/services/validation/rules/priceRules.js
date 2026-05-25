const validatePrice = (product) => {

  const issues = [];

  if (
    product.price === null ||
    product.price === undefined
  ) {

    issues.push({
      issueType: "MISSING_PRICE",

      severity: "HIGH",

      message:
        "Product price is missing",

      suggestedFix:
        "Add valid product price",
    });

    return issues;
  }

  if (
    isNaN(product.price)
  ) {

    issues.push({
      issueType: "INVALID_PRICE",

      severity: "HIGH",

      message:
        "Price must be numeric",

      suggestedFix:
        "Enter valid numeric price",
    });
  }

  if (
    product.price <= 0
  ) {

    issues.push({
      issueType: "INVALID_PRICE",

      severity: "HIGH",

      message:
        "Price must be greater than zero",

      suggestedFix:
        "Provide valid positive price",
    });
  }

  if (
    product.mrp &&
    product.price > product.mrp
  ) {

    issues.push({
      issueType: "INVALID_MRP",

      severity: "HIGH",

      message:
        "Selling price exceeds MRP",

      suggestedFix:
        "Correct MRP or selling price",
    });
  }

  return issues;
};

module.exports = {
  validatePrice,
};