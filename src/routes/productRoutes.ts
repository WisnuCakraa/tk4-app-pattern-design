import express, { Router, Request, Response } from "express";
import Product, { IProduct } from "../models/product";

const router: Router = express.Router();

// Get all products
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get products" });
  }
});

// Buy a product
router.post("/products/:id/buy", async (req: Request, res: Response) => {
  const productId: string = req.params.id;
  const quantity: number = req.body.quantity;
  try {
    const product: IProduct | null = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity available" });
    }
    product.quantity -= quantity;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to buy product" });
  }
});

export default router;
