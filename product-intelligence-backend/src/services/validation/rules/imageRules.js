const validateImage = (product) => {

  const issues = [];

  if (
    !product.imageUrl
  ) {

    issues.push({
      issueType: "MISSING_IMAGE",

      severity: "HIGH",

      message:
        "Product image is missing",

      suggestedFix:
        "Add at least one product image",
    });

    return issues;
  }

  const isValidURL =
    /^https?:\/\/.+/.test(
      product.imageUrl
    );

  if (!isValidURL) {

    issues.push({
      issueType:
        "BROKEN_IMAGE_URL",

      severity: "MEDIUM",

      message:
        "Image URL appears invalid",

      suggestedFix:
        "Provide accessible image URL",
    });
  }

  return issues;
};

module.exports = {
  validateImage,
};