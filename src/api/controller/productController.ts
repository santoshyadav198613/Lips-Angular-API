import { Request, Response, NextFunction, Errback } from 'express';
import { Product } from '../model/product';

export class ProductController {
    static getProducts(req: Request, res: Response, next: NextFunction) {
        Product.find({}, (err: Errback, data: any) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 'success', message: 'Product found!',
                    result: data
                })
            }
        });
    }

    static addProduct(req: Request, res: Response, next: NextFunction) {
        const product = new Product(req.body);
        Product.create(product, (err: Errback, data: any) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 'success', message: 'Product Added!',
                    result: data
                })
            }
        });
    }

    static getProductById(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.id;
        Product.findById(productId, (err: Errback, data: any) => {
            if (err) {
                res.json({
                    status: 'failure', message: 'Product Not Found!',
                    result: null
                })
            } else {
                res.json({
                    status: 'success', message: 'Product Found!',
                    result: data
                })
            }
        });
    }


    static deleteProductById(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.id;
        Product.findByIdAndDelete(productId, (err: Errback, data: any) => {
            if (err) {
                res.json({
                    status: 'failure', message: 'Product Not Found!',
                    result: null
                })
            } else {
                res.json({
                    status: 'success', message: 'Product deleted!',
                    result: data
                })
            }
        });
    }
}