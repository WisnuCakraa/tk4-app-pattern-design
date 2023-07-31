import express, { Router, Request, Response } from "express";
import Article, { IArticle } from "../models/article";

const router: Router = express.Router();

// Get all articles
router.get("/articles", async (req: Request, res: Response) => {
  try {
    const articles: IArticle[] = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to get articles" });
  }
});

// Add a new article
router.post("/articles", async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  try {
    const article: IArticle = new Article({ title, content, author });
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to add the article" });
  }
});

export default router;
