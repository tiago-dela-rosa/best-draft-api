import { v4 as uuidv4 } from 'uuid';
import Preferences from '../../models/preferences';
import logger from '../../../utils/logger';

export default class PreferenceRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create({
    data, userId, date,
  }) {
    logger.info('PreferenceRepository.create');

    const ret = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Preferences)
      .values({
        preference_uid: uuidv4(),
        data,
        created_by: userId,
        created_at: date,
        updated_at: date,
      })
      .execute();
    return ret;
  }

  async getOne(uid) {
    const ret = await this.connection
      .createQueryBuilder()
      .select('preference_uid, data, config, created_at, updated_at')
      .from(Preferences, 'preference')
      .where('preference_uid = :uid', { uid })
      .execute();

    return ret;
  }

  async update({ data, date, preferenceUid }) {
    const ret = await this.connection
      .createQueryBuilder()
      .update(Preferences)
      .set({ data, updated_at: date })
      .where('preference_uid = :id', { id: preferenceUid })
      .execute();

    return ret;
  }
}
