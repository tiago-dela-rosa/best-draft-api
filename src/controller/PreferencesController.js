import logger from '../utils/logger';
import PreferenceService from '../domain/services/preference';

class PreferencesController {
  async create(req, res) {
    logger.debug('PreferencesController.create');
    const preferenceService = new PreferenceService(req, res);
    const ret = await preferenceService.create();

    return res.send(ret);
  }

  async getOne(req, res) {
    logger.debug(`PreferencesController.getOne using uid: ${req.params.uid}`);
    const preferenceService = new PreferenceService(req, res);
    const ret = await preferenceService.getOne(req.params.uid);

    return res.send(ret);
  }

  async update(req, res) {
    logger.debug(`PreferencesController.update using uid: ${req.params.uid}`);
    const preferenceService = new PreferenceService(req, res);
    const ret = await preferenceService.update(req.params.uid);

    return res.send(ret);
  }
}

export default PreferencesController;
