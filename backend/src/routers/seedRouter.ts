import express, { Request, Response } from "express";
import { sequelize } from "../database/database"; 
import asyncHandler from "express-async-handler";
import { Category } from '../models/categorieModel';
import { Product } from '../models/productModel';
import { categories } from "../data";
import { products } from "../data";

const seedRouter = express.Router();


seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Desactivar claves foráneas
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // Borrar tablas

    await Category.destroy({ where: {}, truncate: true });
    await Product.destroy({ where: {}, truncate: true });


    // Reactivar claves foráneas
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // Insertar datos
    const createdCategories = await Category.bulkCreate(categories as any);
    const createdProducts = await Product.bulkCreate(products as any);

    res.send({ createdCategories, createdProducts  });
  })
);

export default seedRouter;


