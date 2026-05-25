const prisma = require("../config/prisma");
const { generatePriceAlert } = require("./alertService");
const {
  createJob,
  startJob,
  updateJobProgress,
  completeJob,
  failJob,
} = require("./jobService");

const addCompetitorPrice = async ({
  skuId,
  platform,
  competitorPrice,
  competitorUrl,
  currency = "INR",
}) => {
  const product = await prisma.product.findUnique({
    where: {
      skuId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const competitorEntry = await prisma.competitorPrice.create({
    data: {
      productId: product.id,

      platform,

      competitorPrice,

      competitorUrl,

      currency,
    },
  });

  return competitorEntry;
};

const getCompetitorPrices = async (skuId) => {
  const product = await prisma.product.findUnique({
    where: {
      skuId,
    },

    include: {
      competitorPrices: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product.competitorPrices;
};

const refreshCompetitorPrices = async () => {
  const job = await createJob({
    jobType: "PRICE_REFRESH",
  });

  try {
    await startJob(job.id);

    const competitorPrices = await prisma.competitorPrice.findMany();

    const total = competitorPrices.length;

    let processed = 0;

    for (const entry of competitorPrices) {
      const marketFluctuation = Math.random();

      let randomAdjustment = 0;

      /*
  Simulate realistic market movement
*/

      if (marketFluctuation < 0.3) {
        /*
    Small decrease
  */
        randomAdjustment = -Math.floor(Math.random() * 300);
      } else if (marketFluctuation < 0.6) {
        /*
    Small increase
  */
        randomAdjustment = Math.floor(Math.random() * 300);
      } else {
        /*
    Stable price
  */
        randomAdjustment = Math.floor(Math.random() * 100) - 50;
      }

      const updatedPrice = Math.max(
        100,
        entry.competitorPrice + randomAdjustment,
      );

      await prisma.competitorPrice.create({
        data: {
          productId: entry.productId,

          platform: entry.platform,

          competitorPrice: updatedPrice,

          competitorUrl: entry.competitorUrl,

          currency: entry.currency,
        },
      });

      const product = await prisma.product.findUnique({
        where: {
          id: entry.productId,
        },
      });

      if (product && updatedPrice > 0) {
        const percentageDifference =
          ((product.price - updatedPrice) / updatedPrice) * 100;

        if (percentageDifference > 10) {
          const { generatePriceAlert } = require("./alertService");

          await generatePriceAlert({
            productId: product.id,

            percentageDifference: Number(percentageDifference.toFixed(2)),
          });
        }
      }

      processed++;

      const progress = Math.floor((processed / total) * 100);

      await updateJobProgress(job.id, progress, {
        processed,
        total,
      });
    }

    await completeJob(job.id, {
      refreshedEntries: total,
    });

    return {
      refreshedEntries: total,

      jobId: job.id,
    };
  } catch (error) {
    await failJob(job.id, error.message);

    throw error;
  }
};

const getPriceComparison = async (skuId) => {
  const product = await prisma.product.findUnique({
    where: {
      skuId,
    },

    include: {
      competitorPrices: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.competitorPrices.length === 0) {
    await generatePriceAlert({
      productId: product.id,

      percentageDifference: Number(percentageDifference),
    });

    return {
      ourPrice: product.price,

      message: "No competitor prices available",
    };
  }

  const prices = product.competitorPrices.map((p) => p.competitorPrice);

  const lowest = Math.min(...prices);

  const highest = Math.max(...prices);

  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  const difference = product.price - lowest;

  const percentageDifference = ((difference / lowest) * 100).toFixed(2);

  let recommendedAction = "Maintain price";

  if (percentageDifference > 10) {
    recommendedAction = "Reduce price";
  }

  return {
    ourPrice: product.price,

    lowestCompetitorPrice: lowest,

    highestCompetitorPrice: highest,

    averageCompetitorPrice: Number(average.toFixed(2)),

    priceGap: difference,

    percentageDifference: Number(percentageDifference),

    recommendedAction,
  };
};

module.exports = {
  addCompetitorPrice,

  getCompetitorPrices,

  refreshCompetitorPrices,

  getPriceComparison,
};
