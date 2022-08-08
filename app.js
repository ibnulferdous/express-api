const express = require("express");
const router = require("./src/routes/api");

const app = new express();

// Security middleware import
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

// Security middleware implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// Express rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Declaring route
app.use("/api/v1", router);

// Undefined route
app.use("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Not found!",
  });
});

module.exports = app;
