import logger from '../../../utils/logger';
import defaultStructure from '../../models/preferences/dataStructure';
import PreferenceRepository from '../../repository/preference';


class PreferenceService {
  constructor(req) {
    this.userId = req.userId;
    this.params = req.body;
    this.headers = req.headers;
    this.filter = req.query;
    this.date = new Date();
    this.preferenceRepository = new PreferenceRepository(req.dbConnection);
  }

  defaultData(game) {
    logger.info(`PreferenceService.defaultData ${JSON.stringify(game)}`);
    return defaultStructure[game].data;
  }

  async create() {
    logger.debug('PreferenceService.create');
    try {
      const preferenceStructure = this.defaultData('smite');

      this.params.data.forEach((item) => {
        preferenceStructure[item.id] = item;
      });

      const ret = await this.preferenceRepository.create({
        data: preferenceStructure,
        userId: this.userId,
        date: this.date,
      });

      return { message: 'success', data: ret };
    } catch (e) {
      return { error: e.message };
    }
  }

  async getOne(uid) {
    logger.info('PreferenceService.getOne');
    try {
      if (!uid) throw Error({ error: 'Need send a valid uid' });
      const ret = await this.preferenceRepository.getOne(uid);
      return { message: 'success', data: ret };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async update(uid) {
    logger.info('PreferenceService.update');

    try {
      const preference = await this.preferenceRepository.getOne(uid);

      this.params.data.forEach((item) => {
        preference[0].data[item.id] = item;
      });

      const criteria = {
        data: preference[0].data,
        date: this.date,
        preferenceUid: uid,
      };

      if (await this.preferenceRepository.update(criteria)) {
        const ret = await this.preferenceRepository.getOne(uid);
        return { message: 'success', data: ret };
      }

      return criteria;
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }
}

export default PreferenceService;
