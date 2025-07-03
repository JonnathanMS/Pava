import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Category } from '../models/categorieModel';
import { Product } from '../models/productModel';

export const categorieRouter = express.Router();

// GET
categorieRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'name'] }],
    });
    res.json(categories);
  })
);

// GET /categories/:id
categorieRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'name'] }],
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  })
);

// POST /categories 
categorieRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }

    const newCategory = await Category.create({ name } as any);
    res.status(201).json(newCategory);
  })
);

// PUT /categories/:id 
categorieRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    const { name } = req.body;
    await category.update({ name: name ?? category.name });

    res.json(category);
  })
);
// DELETE /categories/:id
categorieRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    await category.destroy();
    res.json({ message: 'Category deleted' });
  })
);
