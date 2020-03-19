import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import logger from './utils/logger';
import Database from './db';
import User from './db/entities/User'
import routes from './routes';
import { getConnection } from "typeorm";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


Database.connect(config.db.connection).then((connection) => {
  logger.info(`connected to the database`)

  const user = await getConnection()
    .createQueryBuilder()
    .select("name")
    .from(User, "user")
    .getOne();

  console.log('plz', user);

  app.use("/api/v1", routes);
}).catch((error) => {
  logger.error(`No database connected: ${error}`);
});

app.listen(config.api.port, () => {
  logger.info(`aplication start listening on ${config.api.port}`);
});
