import _ from 'lodash';
import defaultStructure from '../../models/tierlist/dataStructure';
import TierlistRepository from '../../repository/tierlist';
import logger from '../../../utils/logger';
import tools from '../../../utils/tools';

export default class TierlistService {
  constructor(req) {
    this.userId = req.userId;
    this.params = req.body;
    this.headers = req.headers;
    this.date = new Date();
    this.tierlistRepository = new TierlistRepository(req.dbConnection);
  }

  defaultTier(game) {
    logger.info(`TierlistService.defaultTier ${JSON.stringify(game)}`);
    return defaultStructure[game].data;
  }

  validationData() {
    logger.info('TierlistService.validationData');
    const errors = [];

    this.defaultTier('smite');

    if (_.isEmpty(this.params.data)) {
      errors.push({ error: 'Data cannot be empty' });
    }

    const invalidData = this.params.data.filter((value) => _.isEmpty(value));

    if (invalidData.length >= 1) {
      errors.push({ error: 'Cannot send any data empty' });
    }

    // if (invalidData) {
    //   errors.push({ error: "Cannot send empty data" });
    // }

    if (errors.length >= 1) {
      return errors;
    }

    return false;
  }

  async create() {
    logger.info('TierlistService.create');
    try {
      const tierlistDefault = this.defaultTier('smite');

      this.params.data.forEach((item) => {
        tierlistDefault[item.id] = item;
      });

      const tierlist = await this.tierlistRepository.create({
        name: this.params.name,
        data: tierlistDefault,
        userId: this.userId,
        date: this.date,
      });

      return { message: 'success', data: tierlist };
    } catch (e) {
      return { error: e.message };
    }
  }

  async getOne(uid) {
    logger.info('TierlistService.getOne');
    try {
      if (!uid) throw Error({ error: 'Need send a valid uid' });
      const tierlist = await this.tierlistRepository.getOne(uid);
      return { message: 'success', data: tierlist };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async getUserTierlist(uid) {
    logger.debug('TierlistService.getUserTierlist');
    try {
      if (!uid) throw Error({ error: 'Need send a valid uid' });
      const retrieveTierlist = await this.tierlistRepository.getAllByUser(uid);
      return { message: 'success', data: retrieveTierlist };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async update(uid) {
    logger.info('TierlistService.update');

    try {
      const tierlist = await this.tierlistRepository.getOne(uid);

      this.params.data.forEach((item) => {
        tierlist[0].data[item.id] = item;
      });

      const criteria = {
        name: this.params.name,
        data: tierlist[0].data,
        date: this.date,
        tierlist_uid: uid,
      };

      if (await this.tierlistRepository.update(criteria)) {
        const updatedTierlist = await this.tierlistRepository.getOne(uid);
        return { message: 'success', data: updatedTierlist };
      }

      return criteria;
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }
}
