import logger from '../utils/logger';
import MatchupService from '../domain/services/matchup';

class MatchupController {
  async create(req, res) {
    logger.debug('MatchupController.create');
    const matchupService = new MatchupService(req, res);
    const matchupCreate = await matchupService.create();

    return res.send(matchupCreate);
  }

  async getOne(req, res) {
    logger.debug(`MatchupController.getOne using uid: ${req.params.uid}`);
    const { uid } = req.params;
    const matchupService = new MatchupService(req, res);
    const matchupGetOne = await matchupService.getOne(uid);

    return res.send(matchupGetOne);
  }

  async getPublic(req, res) {
    logger.debug('MatchupController.getPublic');
    const uid = '688301d8-d975-49dc-bb85-cbdee0ccf708';
    const matchupService = new MatchupService(req, res);
    const matchupGetOne = await matchupService.getOne(uid);

    return res.send(matchupGetOne);
  }

  async getAllByUser(req, res) {
    logger.debug(`MatchupController.getAllByUser using uid: ${req.params.uid}`);
    const { uid } = req.params;
    const matchupService = new MatchupService(req, res);
    const matchupGetAllByUser = await matchupService.getAllByUser(uid);

    return res.send(matchupGetAllByUser);
  }

  async update(req, res) {
    logger.debug(`MatchupController.update using uid: ${req.params.uid}`);
    const { uid } = req.params;
    const matchupService = new MatchupService(req, res);
    const matchupUpdate = await matchupService.update(uid);

    return res.send(matchupUpdate);
  }
}

export default MatchupController;
