import logger from '../utils/logger';
import TeammateService from '../domain/services/teammate';

class TeammateController {
  async create(req, res) {
    logger.debug('TeammateController.create');
    const teammateService = new TeammateService(req, res);
    const matchupCreate = await teammateService.create();

    return res.send(matchupCreate);
  }

  async getOne(req, res) {
    logger.debug(`TeammateController.getOne using uid: ${req.params.uid}`);
    const teammateService = new TeammateService(req, res);
    const teammateGetOne = await teammateService.getOne(req.params.uid);

    return res.send(teammateGetOne);
  }

  async getAllByUser(req, res) {
    logger.debug(`TeammateController.getAllByUser using uid: ${req.params.uid}`);
    const { uid } = req.params;
    const teammateService = new TeammateService(req, res);
    const teammateGetAllByUser = await teammateService.getAllByUser(uid);

    return res.send(teammateGetAllByUser);
  }

  async update(req, res) {
    logger.debug(`TeammateController.update using uid: ${req.params.uid}`);
    const teammateService = new TeammateService(req, res);
    const teammateUpdate = await teammateService.update(req.params.uid);

    return res.send(teammateUpdate);
  }
}

export default TeammateController;
