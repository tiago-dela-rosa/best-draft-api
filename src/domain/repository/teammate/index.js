import { v4 as uuidv4 } from 'uuid';
import Teammate from '../../models/teammate';
import logger from '../../../utils/logger';

export default class TeammateRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create({
    name, data, userId, date,
  }) {
    logger.debug('TeammateRepository.create');

    const ret = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Teammate)
      .values({
        teammate_uid: uuidv4(),
        name,
        data,
        created_by: userId,
        created_at: date,
        updated_at: date,
      })
      .execute();
    return ret;
  }

  async getOne(uid) {
    logger.debug('TeammateRepository.getOne');
    const ret = await this.connection
      .createQueryBuilder()
      .select('teammate_uid, name, data, config, created_at, updated_at')
      .from(Teammate, 'teammate')
      .where('teammate_uid = :uid', { uid })
      .execute();
    return ret;
  }

  async getAllByUser(uid) {
    const ret = await this.connection
      .createQueryBuilder()
      .select('teammate_uid as uid, name, config, created_at, updated_at')
      .from(Teammate, 'teammate')
      .where('created_by = :uid', { uid })
      .orderBy('name', 'ASC')
      .execute();
    return ret;
  }

  async update({
    name, data, date, teammate_uid,
  }) {
    const ret = await this.connection
      .createQueryBuilder()
      .update(Teammate)
      .set({ name, data, updated_at: date })
      .where('teammate_uid = :uid', { uid: teammate_uid })
      .execute();

    return ret;
  }
}
