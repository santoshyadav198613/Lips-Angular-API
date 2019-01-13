import * as express from 'express';
import { ProductController } from '../api/controller/productController';
export const ProductRoute = express.Router();

ProductRoute.get('/', ProductController.getProducts)
