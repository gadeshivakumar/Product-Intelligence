const prisma = require("../config/prisma");

const getProducts = async ({
  page = 1,
  limit = 10,
  category,
  availability,
  search,
  sortBy = "createdAt",
  order = "desc",
}) => {

  const skip = (page - 1) * limit;

  const where = {};

  if (category) {
    where.category = category;
  }

  if (availability) {
    where.availability = availability;
  }

  if (search) {
    where.OR = [
      {
        productTitle: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        skuId: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,

      skip,

      take: Number(limit),

      orderBy: {
        [sortBy]: order,
      },

      include: {
        issues: true,
        alerts: true,
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,

    pagination: {
      total,

      page: Number(page),

      limit: Number(limit),

      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProductBySku = async (skuId) => {

  const product =
    await prisma.product.findUnique({
      where: {
        skuId,
      },

      include: {
        issues: true,

        alerts: true,

        competitorPrices: true,
      },
    });

  return product;
};

const updateProduct = async (
  skuId,
  updateData
) => {

  const updatedProduct =
    await prisma.product.update({
      where: {
        skuId,
      },

      data: updateData,
    });

  return updatedProduct;
};

module.exports = {
  getProducts,

  getProductBySku,

  updateProduct,
};