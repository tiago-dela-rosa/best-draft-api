import { v4 as uuidv4 } from 'uuid';
import Tierlist from '../../models/tierlist';
import logger from '../../../utils/logger';

export default class TierlistRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create({
    name, data, userId, date,
  }) {
    logger.info('TierlistRepository.create');

    const ret = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Tierlist)
      .values({
        tierlist_uid: uuidv4(),
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
    const tierlist = await this.connection
      .createQueryBuilder()
      .select('tierlist_uid, name, data, config, created_at, updated_at')
      .from(Tierlist, 'tierlist')
      .where('tierlist_uid = :uid', { uid })
      .execute();

    return tierlist;
  }

  async getAllByUser(uid) {
    const ret = await this.connection
      .createQueryBuilder()
      .select('tierlist_uid as uid, name, config, created_at, updated_at')
      .from(Tierlist, 'tierlist')
      .where('created_by = :uid', { uid })
      .orderBy('name', 'ASC')
      .execute();

    return ret;
  }

  async update({
    name, data, date, tierlist_uid,
  }) {
    const ret = await this.connection
      .createQueryBuilder()
      .update(Tierlist)
      .set({ name, data, updated_at: date })
      .where('tierlist_uid = :id', { id: tierlist_uid })
      .execute();

    return ret;
  }
}
