const prisma = require("../config/prisma");

const {
  createJob,
  startJob,
  updateJobProgress,
  completeJob,
  failJob,
} = require("./jobService");

const simulateExtraction = async (
  filePath
) => {

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  return {
    productTitle: "Nike Shoes Blue",

    description:
      "Lightweight running shoes with mesh upper",

    brand: "Nike",

    category: "Shoes",

    color: "Blue",

    material: "Mesh",

    price: 3999,

    mrp: 4999,

    availability: "in_stock",

    visiblePackagingText:
      "NIKE RUN PRO",

    extractedAttributes: {
      gender: "Men",

      productType:
        "Running Shoes",
    },

    extractionConfidence: 0.87,
  };
};

const processVideoUpload = async ({
  file,
  enhanceTitle = false,
}) => {

  const job = await createJob({
    jobType: "VIDEO_UPLOAD",

    metadata: {
      originalFileName:
        file.originalname,
    },
  });

  try {

    await startJob(job.id);

    await updateJobProgress(
      job.id,
      20,
      {
        currentStep:
          "Uploading video",
      }
    );

    const extractedData =
      await simulateExtraction(
        file.path
      );

    await updateJobProgress(
      job.id,
      60,
      {
        currentStep:
          "Extracting product data",
      }
    );

    const product =
      await prisma.product.create({
        data: {
          skuId:
            "SKU-" +
            Date.now(),

          productTitle:
            extractedData.productTitle,

          description:
            extractedData.description,

          brand:
            extractedData.brand,

          category:
            extractedData.category,

          price:
            extractedData.price,

          mrp:
            extractedData.mrp,

          availability:
            extractedData.availability,

          color:
            extractedData.color,

          material:
            extractedData.material,

          visiblePackagingText:
            extractedData.visiblePackagingText,

          extractedAttributes:
            extractedData.extractedAttributes,

          extractionConfidence:
            extractedData.extractionConfidence,

          extractedFrom:
            "VIDEO",

          titleEnhancementEnabled:
            enhanceTitle,

          processingStatus:
            "COMPLETED",
        },
      });

    await updateJobProgress(
      job.id,
      90,
      {
        currentStep:
          "Creating product",
      }
    );

    await completeJob(
      job.id,
      {
        productId: product.id,

        skuId: product.skuId,
      }
    );

    return {
      job,

      product,

      extractedData,
    };

  } catch (error) {

    await failJob(
      job.id,
      error.message
    );

    throw error;
  }
};

module.exports = {
  processVideoUpload,
};