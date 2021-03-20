import app from './app';
import config from './config';
import logger from './utils/logger';

app.listen(config.api.port || 8888, '0.0.0.0', () => {
  logger.info(`aplication start listening on ${config.api.port}`);
});