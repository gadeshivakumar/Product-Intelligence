const { z } = require("zod");

const updateProductSchema = z.object({
  productTitle: z.string().optional(),

  description: z.string().optional(),

  brand: z.string().optional(),

  category: z.string().optional(),

  price: z.number().optional(),

  mrp: z.number().optional(),

  imageUrl: z.string().optional(),

  productUrl: z.string().optional(),

  availability: z
    .enum(["in_stock", "out_of_stock"])
    .optional(),

  color: z.string().optional(),

  size: z.string().optional(),

  material: z.string().optional(),
});

module.exports = {
  updateProductSchema,
};