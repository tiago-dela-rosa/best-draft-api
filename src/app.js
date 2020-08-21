import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import logger from './utils/logger';
import Database from './db';
import routes from './routes/index';
import errorHandling from './utils/errorHandling';

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
  }

  middlewares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
  }

  routes() {
    return app.use('/api/v1', routes);
  }

  database() {
    Database.connect(config.db.connection)
      .then((connection) => {
        logger.info('connected to the database');

        app.use((req, res, next) => {
          req.dbConnection = connection;
          next();
        });

        this.routes();

        app.use((error, req, res, next) => {
          errorHandling(error, req, res, next);
        });
      })
      .catch((error) => {
        logger.error(`No database connected: ${error}`);
      });
  }
}

const app = new AppController().express;

export default app;
