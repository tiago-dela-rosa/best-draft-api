import { Router } from 'express';
import UserController from '../controllers/UserController';
import logger from '../utils/logger';

const routes = Router();
const userController = new UserController;

routes.get("/user", userController.getUsers)

export default routes;