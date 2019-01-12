import { Request, Response, NextFunction, Errback } from 'express';
import { User } from '../model/user';

export class UserController {
    static registartion(req: Request, res: Response, next: NextFunction) {
        const user = new User(req.body);
        User.create(user, (err: Errback, data: any) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 'success', message: 'User Registartion Successful!',
                    result: data
                })
            }
        })
    }
}