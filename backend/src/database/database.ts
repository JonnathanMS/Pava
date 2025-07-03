import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Category } from '../models/categorieModel';
import { Product } from '../models/productModel';
import dotenv from 'dotenv';


dotenv.config();

const DBNAME = process.env.DBNAME || 'pavadb'; 
const DBUSER = process.env.DBUSER || 'root';
const DBHOST = process.env.DBHOST || 'localhost';
const DBPASSWORD = process.env.DBPASSWORD || 'password';
const dbDriver: Dialect = 'mysql';

// Inicialización de sequelize 
export const sequelize = new Sequelize({
  database: DBNAME,
  username: DBUSER,
  password: DBPASSWORD,
  host: DBHOST,
  dialect: dbDriver,
  models: [Category, Product],
  modelMatch: (filename, member) => {
    return filename.toLowerCase() === member.toLowerCase();
  },
});

// testeando la conexión.
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database established successfully!');
  } catch (error) {
    console.error('❌ Error while connecting to the database:', error);
    process.exit(1);
  }
};

