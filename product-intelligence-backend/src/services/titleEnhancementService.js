const prisma = require("../config/prisma");

const trendingKeywordsByCategory = {
  Shoes: [
    "Lightweight",
    "Running",
    "Comfortable",
    "Breathable",
    "Sports",
  ],

  Bags: [
    "Waterproof",
    "Travel",
    "Premium",
    "Stylish",
    "Durable",
  ],

  Watches: [
    "Luxury",
    "Analog",
    "Smart",
    "Premium",
  ],

  Clothing: [
    "Casual",
    "Slim Fit",
    "Cotton",
    "Trendy",
  ],
};

const extractKeywords = (
  product
) => {

  const keywords = [];

  if (product.brand) {
    keywords.push(product.brand);
  }

  if (product.color) {
    keywords.push(product.color);
  }

  if (product.material) {
    keywords.push(product.material);
  }

  if (product.category) {
    keywords.push(product.category);
  }

  const trendingKeywords =
    trendingKeywordsByCategory[
      product.category
    ] || [
      "Premium",
      "Stylish",
      "Best Quality",
    ];

  keywords.push(
    ...trendingKeywords.slice(0, 2)
  );

  return [
    ...new Set(keywords),
  ];
};

const buildEnhancedTitle = (
  product,
  keywords
) => {

  const parts = [];

  if (product.brand) {
    parts.push(product.brand);
  }

  if (product.color) {
    parts.push(product.color);
  }

  if (keywords.includes("Lightweight")) {
    parts.push("Lightweight");
  }

  if (
    keywords.includes("Breathable")
  ) {
    parts.push("Breathable");
  }

  if (product.material) {
    parts.push(product.material);
  }

  if (product.category) {
    parts.push(product.category);
  }

  if (
    product.extractedAttributes
      ?.gender
  ) {

    parts.push(
      `for ${product.extractedAttributes.gender}`
    );
  }

  return parts.join(" ");
};

const generateEnhancementReason =
  (
    originalTitle,
    enhancedTitle,
    keywords
  ) => {

    return `
Enhanced the title by adding important searchable attributes such as brand, color, material, category, and trending marketplace keywords like ${keywords.join(", ")}. This improves discoverability and listing quality.
  `.trim();
  };

const enhanceProductTitle =
  async (skuId) => {

    const product =
      await prisma.product.findUnique({
        where: {
          skuId,
        },
      });

    if (!product) {

      throw new Error(
        "Product not found"
      );
    }

    const originalTitle =
      product.productTitle || "";

    const keywords =
      extractKeywords(product);

    const enhancedTitle =
      buildEnhancedTitle(
        product,
        keywords
      );

    const reason =
      generateEnhancementReason(
        originalTitle,
        enhancedTitle,
        keywords
      );

    const updatedProduct =
      await prisma.product.update({
        where: {
          skuId,
        },

        data: {
          enhancedTitle,

          titleEnhancementEnabled: true,
        },
      });

    return {
      originalTitle,

      enhancedTitle,

      keywords,

      reason,

      product: updatedProduct,
    };
  };

module.exports = {
  enhanceProductTitle,
};