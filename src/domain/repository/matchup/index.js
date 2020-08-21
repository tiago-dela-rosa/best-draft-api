import { v4 as uuidv4 } from 'uuid';
import Matchup from '../../models/matchups';
import logger from '../../../utils/logger';

export default class MatchupRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create({
    name, data, userId, date,
  }) {
    logger.debug('MatchupRepository.create');

    const ret = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Matchup)
      .values({
        matchup_uid: uuidv4(),
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
    const ret = await this.connection
      .createQueryBuilder()
      .select('matchup_uid, name, data, config, created_at, updated_at')
      .from(Matchup, 'matchup')
      .where('matchup_uid = :uid', { uid })
      .execute();

    return ret;
  }

  async getAllByUser(uid) {
    const ret = await this.connection
      .createQueryBuilder()
      .select('matchup_uid as uid, name, config, created_at, updated_at')
      .from(Matchup, 'matchup')
      .where('created_by = :uid', { uid })
      .orderBy('name', 'ASC')
      .execute();

    return ret;
  }

  async update({
    name, data, date, matchup_uid,
  }) {
    const ret = await this.connection
      .createQueryBuilder()
      .update(Matchup)
      .set({ name, data, updated_at: date })
      .where('matchup_uid = :uid', { uid: matchup_uid })
      .execute();

    return ret;
  }
}
