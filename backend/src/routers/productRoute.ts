import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';
import { Category } from '../models/categorieModel';

export const productRouter = express.Router();

// GET /products
productRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });
    res.json(products);
  })
);

// GET /products/:id
productRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

// POST /products
productRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, category_id } = req.body;

    // Verificar que la categoría exista
    const category = await Category.findByPk(category_id);
    if (!category) {
      res.status(400).json({ message: 'Invalid category_id este es' });
      return;
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category_id: category_id,
    } as any);

    res.status(201).json(newProduct);
  })
);

productRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const { name, description, price, category_id } = req.body;

    // Si va a cambiar la categoría, verificar que exista
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        res.status(400).json({ message: 'Invalid category_id' });
        return;
      }
    }

    await product.update({
      name: name ?? product.name,
      description: description ?? product.description,
      price: price ?? product.price,
      category_id: category_id ?? product.category_id,
    });

    res.json(product);
  })
);
productRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  })
);
    
