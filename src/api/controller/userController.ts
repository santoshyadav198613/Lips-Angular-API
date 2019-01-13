import { Request, Response, NextFunction, Errback } from 'express';
import * as bcryptJs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../model/user';

export class UserController {
    static login(req: Request, res: Response, next: NextFunction) {
        User.findOne({ email: req.body.email }, (err: Errback, result: any) => {
            if (err) {
                next(err)
            } else {
                if (result === null) {
                    res.json({
                        status: 'failure', message: 'User name or password is incorrect!',
                        result: {}
                    })
                } else {
                    if (bcryptJs.compareSync(req.body.password, result.password)) {
                        const token = jwt.sign({ id: result._id }, req.app.get('token'), { expiresIn: '1h' })
                        res.json({
                            status: 'success', message: 'Login Successful!',
                            result: token
                        })
                    } else {
                        res.json({
                            status: 'failure', message: 'User name or password is incorrect!',
                            result: {}
                        })
                    }
                }
            }
        });
    }

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