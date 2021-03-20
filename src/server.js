import app from './app';
import logger from './utils/logger';

const port = 8888;

app.listen(port, '0.0.0.0', () => {
  logger.info(`aplication start listening on ${port}`);
});