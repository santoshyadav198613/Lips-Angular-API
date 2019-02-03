import { Request, Response, NextFunction, Errback } from 'express';
import * as bcryptJs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../model/user';

export class UserController {
    static login(req: Request, res: Response, next: NextFunction) {
        User.findOne({ email: req.body.email } , 'firstName lastName email password', (err: Errback, result: any) => {
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
                            result: token , data : result
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

    static getProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.body.userId;
        console.log(userId);
        User.findById(userId, (err: Errback, data: any) => {
            if (err) {
                next(err)
            } else {
                console.log(data);
                res.json({
                    status: 'success', message: 'profile found',
                    result: data
                })
            }
        })
    }

    static updateProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.body.userId;
        User.findByIdAndUpdate(userId, {
            $set: {
                addressInfo: req.body.addressInfo,
                mobile: req.body.mobile
            }
        }, (err: Errback, data: any) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 'success', message: 'Profile Updated',
                    result: data
                })
            }
        })
    }
}