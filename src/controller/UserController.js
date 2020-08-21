import logger from '../utils/logger';
import UserService from '../domain/services/user';

class UserController {
  async create(req, res) {
    logger.info('UserController.create');
    try {
      const userService = new UserService(req, res);
      const duplicatedEmail = await userService.duplicatedEmail();
      if (duplicatedEmail) throw duplicatedEmail;
      await userService.createUser();
      return res.status(200).send({ message: 'success', ...req.body });
    } catch (err) {
      logger.info(`Validation Error: ${JSON.stringify(err)}`);
      return res.status(400).send(err);
    }
  }

  async login(req, res) {
    logger.info('UserController.login');
    try {
      const userService = new UserService(req, res);
      const user = await userService.find();
      if (user.error) throw user;
      const newPass = userService.comparePassword(user.password);
      if (newPass) throw newPass;
      const token = userService.tokenSign();
      return res.status(200).send(
        {
          auth: true,
          token,
          user:
          {
            uid: user.user_uid,
            name: user.name,
            email: user.email,
          },
        },
      );
    } catch (err) {
      logger.info(`Validation Error: ${JSON.stringify(err)}`);
      return res.status(400).send(err);
    }
  }
}

export default UserController;
