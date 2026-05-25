const { z } = require("zod");

const competitorPriceSchema =
  z.object({

    platform: z.string(),

    competitorPrice:
      z.number().positive(),

    competitorUrl:
      z.string().optional(),

    currency:
      z.string().optional(),
  });

module.exports = {
  competitorPriceSchema,
};