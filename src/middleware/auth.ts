import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'

export function auth(req: Request, res: Response, next: NextFunction) {
    const token: any = req.header('access-token');
    //console.log(token);
    jwt.verify(token, req.app.get('token'), (err: any, result: any) => {
        if (err) {
            res.status(401).json({
                status: 'failure', message: 'Invalid token or token is expired',
                result: {}
            })
        } else {
            req.body.userId = result.id;
            next();
        }
    })
}