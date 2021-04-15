import app from './app';
import config from './config';
import logger from './utils/logger';

const port = process.env.PORT || 8888
logger.info(`Trying to connect to the port ${port}`)


app.listen(port, '0.0.0.0', () => {
  logger.info(`aplication start listening on ${port}`);
});
