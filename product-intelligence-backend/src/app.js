const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./docs/swagger");

const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const healthRoutes = require("./routes/healthRoutes");
const productRoutes = require("./routes/productRoutes");
const jobRoutes = require("./routes/jobRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const csvRoutes = require("./routes/csvRoutes");
const validationRoutes = require("./routes/validationRoutes");
const titleEnhancementRoutes = require("./routes/titleEnhancementRoutes");
const competitorPriceRoutes = require("./routes/competitorPriceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const alertRoutes = require("./routes/alertRoutes");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "https://product-intelligence-silk.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/uploads", express.static("src/uploads"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", healthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", uploadRoutes);
app.use("/api", csvRoutes);
app.use("/api", validationRoutes);
app.use("/api", titleEnhancementRoutes);
app.use("/api", competitorPriceRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", alertRoutes);
app.use(notFound);

app.use(errorHandler);

module.exports = app;
