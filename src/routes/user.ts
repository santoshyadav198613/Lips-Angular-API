import * as express from 'express';
import { UserController } from '../api/controller/userController';
import { auth } from '../middleware/auth';
export const UserRoute = express.Router();

UserRoute.post('/login', UserController.login)
UserRoute.post('/registration', UserController.registartion)
UserRoute.post('/getProfile', auth, UserController.getProfile)
UserRoute.put('/updateProfile', auth, UserController.updateProfile)
