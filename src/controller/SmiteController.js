import logger from '../utils/logger';
import SmiteApi from '../domain/services/smiteApi';

class SmiteController {

  async createSession(req, res) {
    logger.info('SmiteController.createSession');
    const smiteApiService = new SmiteApi(req, res)  
    const session = await smiteApiService.createSession()
    res.send(session)
  }

  async testSession(req, res) {
    logger.info('SmiteController.testSession');
    const smiteApiService = new SmiteApi(req, res)  
    const session = await smiteApiService.testSession()
    res.send(session)    
  }

  async getPlayerByName(req, res) {
    logger.info('SmiteController.getPlayer')
    const smiteApiService = new SmiteApi(req, res)
    const player = await smiteApiService.getPlayerByName()
    res.send(player)
  }

  async getPlayerStatus(req, res) {
    logger.info('SmiteController.getPlayerStatus')
    const smiteApiService = new SmiteApi(req, res)
    const status = await smiteApiService.getPlayerStatus()
    res.send(status)    
  }

  async getMatchPlayerDetails(req, res) {
    logger.info('SmiteController.getMatchPlayerDetails')
    const smiteApiService = new SmiteApi(req, res)
    const matchDetails = await smiteApiService.getMatchPlayerDetails()
    res.send(matchDetails)
  }

}

export default SmiteController;
