const swaggerJsdoc =
  require("swagger-jsdoc");

const swaggerComponents =
  require("./swagger/components");

const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title:
        "Product Intelligence Dashboard API",

      version: "1.0.0",

      description:
        `
        Backend APIs for Product Intelligence Dashboard.

        Features:
        - Video product ingestion
        - CSV imports
        - Validation engine
        - Competitor pricing
        - Alerts
        - Dashboard analytics
        - Job tracking
        `,
    },

    servers: [
      {
        url:
          "http://localhost:5000/api",

        description:
          "Local Development Server",
      },
    ],

    tags: [
      {
        name:
          "Health",
      },

      {
        name:
          "Products",
      },

      {
        name:
          "Uploads",
      },

      {
        name:
          "CSV Imports",
      },

      {
        name:
          "Validation",
      },

      {
        name:
          "Title Enhancement",
      },

      {
        name:
          "Competitor Pricing",
      },

      {
        name:
          "Alerts",
      },

      {
        name:
          "Jobs",
      },

      {
        name:
          "Dashboard",
      },
    ],

    ...swaggerComponents,
  },

  apis: [
    "./src/routes/*.js",
  ],
};

const swaggerSpec =
  swaggerJsdoc(options);

module.exports =
  swaggerSpec;