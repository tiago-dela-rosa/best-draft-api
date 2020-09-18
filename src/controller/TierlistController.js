import logger from '../utils/logger';
import TierlistService from '../domain/services/tierlist';

class TierlistController {
  default(req, res) {
    logger.info('TierlistController.default');
    const tierlistService = new TierlistService(req, res);

    const defaultTier = tierlistService.defaultTier('smite');
    return res.send(defaultTier);
  }

  async create(req, res) {
    const tierlistService = new TierlistService(req, res);

    const validationErrors = tierlistService.validationData();

    if (validationErrors) {
      return res.send(validationErrors);
    }

    const tierlist = await tierlistService.create();

    return res.send(tierlist);
  }

  async getOne(req, res) {
    logger.info('TierlistController.getOne');
    const { uid } = req.params;
    const tierlistService = new TierlistService(req, res);
    const tierlist = await tierlistService.getOne(uid);

    return res.send(tierlist);
  }

  async getPublic(req, res) {
    logger.info('TierlistController.getPublic');
    const uid = '7a9d0a92-1803-473f-b54e-f95cc05b05b9';
    const tierlistService = new TierlistService(req, res);
    const tierlist = await tierlistService.getOne(uid);

    return res.send(tierlist);
  }

  async getUserTierlist(req, res) {
    logger.debug('TierlistController.getUserTierlist');
    const { uid } = req.params;
    const tierlistService = new TierlistService(req, res);
    const retrieveTierlist = await tierlistService.getUserTierlist(uid);
    return res.send(retrieveTierlist);
  }

  async update(req, res) {
    const tierlistService = new TierlistService(req, res);
    const validationErrors = tierlistService.validationData();
    const { uid } = req.params;

    if (validationErrors) {
      return res.send(validationErrors);
    }

    const tierlist = await tierlistService.update(uid);

    return res.send(tierlist);
  }
}

export default TierlistController;
