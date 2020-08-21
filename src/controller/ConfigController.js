import Config from "../domain/models/config";
import logger from "../utils/logger";
import ConfigService from "../domain/services/config";

class ConfigController {
  async create(req, res) {
    logger.info("ConfigController.create");
    const configService = new ConfigService(req, res);

    try {
      const newConfig = await configService.create();
      logger.info(`Config created: ${JSON.stringify(newConfig)}`);
      return res.status(200).send(req.body);
    } catch (err) {
      return res.status(400).send({ code: "db_error", err });
    }
  }
}

export default ConfigController;
