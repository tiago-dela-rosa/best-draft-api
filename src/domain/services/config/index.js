import ConfigRepository from "../../repository/config";
import logger from "../../../utils/logger";

export default class ConfigService {
  constructor(req, res) {
    this.params = req.body;
    this.config = "";
    this.date = new Date();
    this.configRepository = new ConfigRepository(req.dbConnection);
  }

  async create() {
    logger.info("ConfigService.create");
    const config = await this.configRepository.create({
      date: this.date,
      ...this.params,
    });
    return config;
  }
}
