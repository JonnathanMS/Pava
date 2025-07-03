import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import { sequelize, connectDB } from './database/database';
import seedRouter from './routers/seedRouter'
import { productRouter } from './routers/productRoute'
import { categorieRouter } from './routers/categorieRoute';

dotenv.config()

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'API running' });
});
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categorieRouter);

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message })
  next()
})

const PORT: number = parseInt((process.env.PORT || '5001') as string, 10)

const startServer = async () => {
  await connectDB(); // Primero conectar

  await sequelize.sync({ force: false }); // Sincronizar modelos

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
