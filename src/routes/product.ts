import * as express from 'express';
import { ProductController } from '../api/controller/productController';
export const ProductRoute = express.Router();

ProductRoute.get('/', ProductController.getProducts);
ProductRoute.post('/', ProductController.addProduct);
ProductRoute.get('/getProductandCount', ProductController.getProductCount);
ProductRoute.get('/getProductCount', ProductController.getProductListCount);
ProductRoute.get('/:id', ProductController.getProductById);
ProductRoute.delete('/:id', ProductController.deleteProductById);