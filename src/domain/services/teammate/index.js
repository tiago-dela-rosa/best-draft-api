import _ from 'lodash';
import logger from '../../../utils/logger';
import defaultStructure from '../../models/teammate/dataStructure';
import TeammateRepository from '../../repository/teammate';

export default class TeammateService {
  constructor(req) {
    this.userId = req.userId;
    this.params = req.body;
    this.headers = req.headers;
    this.filter = req.query;
    this.date = new Date();
    this.teammateRepository = new TeammateRepository(req.dbConnection);
  }

  validationData() {
    logger.debug('TeammateService.validationData');
    const errors = [];

    if (_.isEmpty(this.params.data)) {
      errors.push({ error: 'Data cannot be empty' });
    }

    const invalidData = this.params.data.filter((value) => _.isEmpty(value));

    if (invalidData.length >= 1) {
      errors.push({ error: 'Cannot send any data empty' });
    }

    if (errors.length >= 1) {
      return errors;
    }

    return false;
  }

  async create() {
    logger.debug('TeammateService.create');

    try {
      const validation = this.validationData();

      if (validation) {
        throw validation;
      }

      this.params.data.forEach((character) => {
        if (defaultStructure.data[character.id]) {
          character.teammate.forEach((alongWith) => {
            // original
            defaultStructure.data[character.id].teammate[
              alongWith.id
            ] = alongWith;
            // mirror
            defaultStructure.data[alongWith.id].teammate[character.id] = {
              id: character.id,
              name: character.name,
              value: alongWith.value,
            };
          });
        }
      });

      await this.teammateRepository.create({
        name: this.params.name,
        data: defaultStructure.data,
        userId: this.userId,
        date: this.date,
      });

      return { message: 'success', data: defaultStructure.data };
    } catch (errors) {
      return { errors };
    }
  }

  async getOne(uid) {
    logger.debug('TeammateService.getOne');
    try {
      const ret = await this.teammateRepository.getOne(uid);
      if (this.filter.god) {
        logger.debug(`Filtered! ${this.filter.god}`);
        const retFiltered = {
          matchup_uid: ret[0].teammate_uid,
          name: ret[0].name,
          data: ret[0].data[this.filter.god],
        };
        return { message: 'success', data: retFiltered };
      }
      return { message: 'success', data: ret };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async getAllByUser(uid) {
    logger.debug('TeammateService.getAllByUser');
    try {
      const ret = await this.teammateRepository.getAllByUser(uid);
      return { message: 'success', data: ret };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async update(uid) {
    logger.debug('TeammateService.update');
    try {
      const validation = this.validationData();
      if (validation) {
        throw validation;
      }

      const teammateConfig = await this.teammateRepository.getOne(uid);

      if (teammateConfig.length === 0 || !teammateConfig) {
        throw Error(`cannot find teammate config for ${uid}`);
      }

      this.params.data.forEach((character) => {
        if (teammateConfig[0].data[character.id]) {
          character.teammate.forEach((alongWith) => {
            // original
            teammateConfig[0].data[character.id].teammate[
              alongWith.id
            ] = alongWith;
            // mirror
            teammateConfig[0].data[alongWith.id].teammate[character.id] = {
              id: character.id,
              name: character.name,
              value: alongWith.value,
            };
          });
        }
      });

      const criteria = {
        name: this.params.name,
        data: teammateConfig[0].data,
        date: this.date,
        teammate_uid: uid,
      };

      if (await this.teammateRepository.update(criteria)) {
        const lastUpdate = await this.teammateRepository.getOne(uid);
        return { message: 'success', data: lastUpdate };
      }

      return criteria;
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }
}
