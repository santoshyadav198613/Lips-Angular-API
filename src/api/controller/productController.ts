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
}