const fs = require("fs");

const csv = require("csv-parser");

const prisma = require("../config/prisma");

const {
  createJob,
  startJob,
  updateJobProgress,
  completeJob,
  partiallyCompleteJob,
  failJob,
} = require("./jobService");

const parseCSV = (filePath) => {

  return new Promise((resolve, reject) => {

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())

      .on("data", (data) => {
        results.push(data);
      })

      .on("end", () => {
        resolve(results);
      })

      .on("error", (error) => {
        reject(error);
      });
  });
};

const validateRow = (row) => {

  const errors = [];

  if (!row.sku_id) {
    errors.push("SKU ID is required");
  }

  if (!row.product_title) {
    errors.push(
      "Product title is required"
    );
  }

  if (
    row.price &&
    isNaN(Number(row.price))
  ) {
    errors.push(
      "Price must be numeric"
    );
  }

  if (
    row.mrp &&
    isNaN(Number(row.mrp))
  ) {
    errors.push(
      "MRP must be numeric"
    );
  }

  return errors;
};

const processCSVUpload = async ({
  file,
}) => {

  const job = await createJob({
    jobType: "CSV_IMPORT",

    metadata: {
      originalFileName:
        file.originalname,
    },
  });

  try {

    await startJob(job.id);

    await updateJobProgress(
      job.id,
      10,
      {
        currentStep:
          "Reading CSV file",
      }
    );

    const rows =
      await parseCSV(file.path);

    const totalRows = rows.length;

    const successfulRows = [];

    const failedRows = [];

    let processedCount = 0;

    for (const row of rows) {

      try {

        const validationErrors =
          validateRow(row);

        if (
          validationErrors.length > 0
        ) {

          failedRows.push({
            row,

            errors:
              validationErrors,
          });

          continue;
        }

        const existingProduct =
          await prisma.product.findUnique({
            where: {
              skuId: row.sku_id,
            },
          });

        if (existingProduct) {

          failedRows.push({
            row,

            errors: [
              "Duplicate SKU ID",
            ],
          });

          continue;
        }

        const product =
          await prisma.product.create({
            data: {
              skuId: row.sku_id,

              productTitle:
                row.product_title,

              description:
                row.description,

              brand: row.brand,

              category:
                row.category,

              price: row.price
                ? Number(row.price)
                : null,

              mrp: row.mrp
                ? Number(row.mrp)
                : null,

              imageUrl:
                row.image_url,

              productUrl:
                row.product_url,

              availability:
                row.availability ===
                "out_of_stock"
                  ? "out_of_stock"
                  : "in_stock",

              color: row.color,

              size: row.size,

              material:
                row.material,

              extractedFrom: "CSV",

              processingStatus:
                "COMPLETED",
            },
          });

        successfulRows.push(product);

        processedCount++;

        const progress =
          Math.floor(
            (processedCount /
              totalRows) *
              100
          );

        await updateJobProgress(
          job.id,
          progress,
          {
            currentStep:
              "Importing products",

            processedRows:
              processedCount,

            totalRows,
          }
        );

      } catch (error) {

        failedRows.push({
          row,

          errors: [error.message],
        });
      }
    }

    const responseData = {
      totalRows,

      successfulRowsCount:
        successfulRows.length,

      failedRowsCount:
        failedRows.length,

      failedRows,
    };

    if (
      failedRows.length > 0
    ) {

      await partiallyCompleteJob(
        job.id,
        {
          totalRows,

          successfulRows:
            successfulRows.length,

          failedRows:
            failedRows.length,

          metadata: responseData,
        }
      );

    } else {

      await completeJob(
        job.id,
        responseData
      );
    }

    return {
      jobId: job.id,

      ...responseData,
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
  processCSVUpload,
};