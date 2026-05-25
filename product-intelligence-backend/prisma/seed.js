const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  const product1 = await prisma.product.create({
    data: {
      skuId: "SHOE002",

      productTitle: "Nike Shoes Blue",

      description: "Comfortable lightweight running shoes",

      brand: "Nike",

      category: "Shoes",

      price: 3999,

      mrp: 4999,

      imageUrl: "https://example.com/shoe.jpg",

      availability: "in_stock",

      color: "Blue",

      material: "Mesh",

      extractedFrom: "VIDEO",

      extractionConfidence: 0.87,

      titleEnhancementEnabled: true,

      enhancedTitle:
        "Nike Blue Lightweight Running Shoes for Men with Mesh Upper",

      listingQualityScore: 82,
    },
  });

  await prisma.productIssue.createMany({
    data: [
      {
        productId: product1.id,

        issueType: "SHORT_TITLE",

        severity: "MEDIUM",

        message: "Product title is too short",

        suggestedFix:
          "Add brand, product type, and attributes",
      },

      {
        productId: product1.id,

        issueType: "MISSING_SIZE",

        severity: "LOW",

        message: "Size attribute missing",

        suggestedFix:
          "Add size details",
      },
    ],
  });

  await prisma.competitorPrice.createMany({
    data: [
      {
        productId: product1.id,

        platform: "Amazon",

        competitorPrice: 3499,

        competitorUrl:
          "https://amazon.com/sample",
      },

      {
        productId: product1.id,

        platform: "Myntra",

        competitorPrice: 3799,

        competitorUrl:
          "https://myntra.com/sample",
      },
    ],
  });

  await prisma.alert.create({
    data: {
      productId: product1.id,

      severity: "HIGH",

      alertType: "PRICE_GAP",

      message:
        "Flipkart price is 14% higher than competitor",
    },
  });

  await prisma.job.create({
    data: {
      jobType: "VIDEO_UPLOAD",

      status: "COMPLETED",

      progress: 100,

      totalRows: 1,

      successfulRows: 1,
    },
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });