import app from "./app";
import config from "./config";
import logger from "./utils/logger";

const port = process.env.PORT || 8888;
const host = "0.0.0.0";
logger.info(`Trying to connect to the port ${port}`);

app.listen(port, host, (err) => {
  if (err) logger.error(`failed to listen, err: ${err}`);
  logger.info(`aplication start listening on ${port}`);
});
