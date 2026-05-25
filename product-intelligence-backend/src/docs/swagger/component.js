const components = {
  components: {

    schemas: {

      ApiResponse: {
        type: "object",

        properties: {
          success: {
            type: "boolean",
          },

          message: {
            type: "string",
          },

          data: {
            type: "object",
          },

          error: {
            type: "object",
            nullable: true,
          },
        },
      },

      Product: {
        type: "object",

        properties: {
          id: {
            type: "string",
          },

          skuId: {
            type: "string",
          },

          productTitle: {
            type: "string",
          },

          brand: {
            type: "string",
          },

          category: {
            type: "string",
          },

          price: {
            type: "number",
          },

          mrp: {
            type: "number",
          },

          availability: {
            type: "string",
          },

          listingQualityScore: {
            type: "number",
          },
        },
      },

      ProductIssue: {
        type: "object",

        properties: {
          issueType: {
            type: "string",
          },

          severity: {
            type: "string",
          },

          message: {
            type: "string",
          },

          suggestedFix: {
            type: "string",
          },
        },
      },

      Alert: {
        type: "object",

        properties: {
          severity: {
            type: "string",
          },

          alertType: {
            type: "string",
          },

          message: {
            type: "string",
          },

          readStatus: {
            type: "string",
          },
        },
      },

      Job: {
        type: "object",

        properties: {
          id: {
            type: "string",
          },

          jobType: {
            type: "string",
          },

          status: {
            type: "string",
          },

          progress: {
            type: "number",
          },
        },
      },
    },
  },
};

module.exports = components;