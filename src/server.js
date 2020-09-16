import app from './app';
import config from './config';
import logger from './utils/logger';

app.listen(process.env.PORT || 8888, () => {
  logger.info(`aplication start listening on ${config.api.port}`);
});
