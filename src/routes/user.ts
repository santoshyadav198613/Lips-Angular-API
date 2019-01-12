import * as express from 'express';
import { UserController } from '../api/controller/userController';
export const UserRoute = express.Router();

UserRoute.post('/registration', UserController.registartion)
