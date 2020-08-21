import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import logger from '../../../utils/logger';
import UserRepository from '../../repository/user';

export default class UserService {
  constructor(req) {
    this.body = req.body;
    this.userRepository = new UserRepository(req.dbConnection);
    this.date = new Date();
    this.hash = '';
    this.user = '';
  }

  async find() {
    logger.info('UserService.find');
    const user = await this.userRepository.find(this.body);
    if (!user) {
      return {
        error: {
          status: 400,
          code: '002',
          type: 'email',
          message: 'the email entered does not belong to any account',
        },
      };
    }
    this.setUser(user);
    return user;
  }

  async duplicatedEmail() {
    const duplicateEmail = await this.userRepository.find(this.body);
    if (_.size(duplicateEmail) > 0) {
      logger.info(
        `UserService.duplicatedEmail, found a duplicated email ${this.body.email}`,
      );
      return {
        status: 409,
        error: `User using ${this.body.email} email already exist`,
      };
    }
    return false;
  }

  async createUser() {
    this.setHash(this.body.password);
    const params = { hash: this.hash, date: this.date, ...this.body };
    const newUser = await this.userRepository.create(params);
    return newUser;
  }

  getHash() {
    return this.hash;
  }

  setHash(stringToHash) {
    const saltRounds = 9;
    const hash = stringToHash;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.hash = bcrypt.hashSync(hash, salt);
    return this.hash;
  }

  setUser(value) {
    return (this.user = value);
  }

  comparePassword(password) {
    if (!bcrypt.compareSync(this.body.password, password)) {
      return {
        error: {
          status: 400,
          code: '001',
          type: 'password',
          message: 'wrong credentials',
        },
      };
    }
    return false;
  }

  tokenSign() {
    return jwt.sign({ id: this.user.user_uid }, process.env.DEV_AUTH_SECRET, {
      // expiresIn: 900, // expires in 15min
    });
  }
}
