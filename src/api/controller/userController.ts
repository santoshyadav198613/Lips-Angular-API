import { Request, Response, NextFunction, Errback } from 'express';
import { User } from '../model/user';


export class UserController {
    static registartion(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const user = new User(req.body);
        User.create(user, (err: Errback, data: any) => {
            if (err) {
                console.log(err);
                next(err)
            } else {
                console.log(data);
                res.json({
                    status: 'success', message: 'User Registartion Successful!',
                    result: data
                })
            }
        })
    }

}