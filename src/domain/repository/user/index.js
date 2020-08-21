import { v4 as uuidv4 } from 'uuid';
import User from '../../models/user';

export default class UserRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create({
    name, email, hash, date,
  }) {
    const newUser = await this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        user_uid: uuidv4(),
        name,
        email,
        password: hash,
        created_at: date,
        updated_at: date,
      })
      .execute();

    return newUser;
  }

  async find(params) {
    const user = await this.connection.getRepository(User).findOne({
      select: ['user_uid', 'name', 'email', 'password'],
      where: {
        email: params.email,
      },
    });
    return user;
  }
}
