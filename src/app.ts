import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import articleRoutes from "./routes/articleRoutes";

const app: express.Application = express();
const PORT: number = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tk-4-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/product", productRoutes);
app.use("/article", articleRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
