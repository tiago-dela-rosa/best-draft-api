import _ from 'lodash';
import logger from '../../../utils/logger';
import defaultStructure from '../../models/matchups/dataStructure';
import MatchupRepository from '../../repository/matchup';

class MatchupService {
  constructor(req) {
    this.userId = req.userId;
    this.params = req.body;
    this.headers = req.headers;
    this.filter = req.query;
    this.date = new Date();
    this.matchupRepository = new MatchupRepository(req.dbConnection);
  }

  validationData() {
    logger.debug('MatchupService.validationData');
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
    logger.debug('MatchupService.create');

    try {
      const validation = this.validationData();

      if (validation) {
        throw validation;
      }

      this.params.data.forEach((character) => {
        if (defaultStructure.data[character.id]) {
          character.against.forEach((against) => {
            // original
            defaultStructure.data[character.id].against[against.id] = against;
            // mirror
            const mirrorValue = 6 - against.value;
            defaultStructure.data[against.id].against[character.id] = {
              id: character.id,
              name: character.name,
              value: mirrorValue,
            };
          });
        }
      });

      await this.matchupRepository.create({
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
    logger.debug('MatchupService.getOne');
    try {
      const ret = await this.matchupRepository.getOne(uid);

      if (this.filter.god) {
        logger.debug(`Filtered! ${this.filter.god}`);
        const retFiltered = {
          matchup_uid: ret[0].matchup_uid,
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
    logger.debug('MatchupService.getAllByUser');
    try {
      const ret = await this.matchupRepository.getAllByUser(uid);
      return { message: 'success', data: ret };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }

  async update(uid) {
    logger.debug('MatchupService.update');
    try {
      const validation = this.validationData();
      if (validation) {
        throw validation;
      }

      const userMatchup = await this.matchupRepository.getOne(uid);

      this.params.data.forEach((character) => {
        if (userMatchup[0].data[character.id]) {
          character.against.forEach((against) => {
            // original
            userMatchup[0].data[character.id].against[against.id] = against;
            // mirror
            const mirrorValue = 6 - against.value;
            userMatchup[0].data[against.id].against[character.id] = {
              id: character.id,
              name: character.name,
              value: mirrorValue,
            };
          });
        }
      });

      const criteria = {
        name: this.params.name,
        data: userMatchup[0].data,
        date: this.date,
        matchup_uid: uid,
      };

      if (await this.matchupRepository.update(criteria)) {
        const lastUpdate = await this.matchupRepository.getOne(uid);
        return { message: 'success', data: lastUpdate };
      }

      return criteria;
    } catch (error) {
      logger.error(error);
      return { error };
    }
  }
}

export default MatchupService;
