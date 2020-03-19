import logger from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config()

const envFile = process.env.NODE_ENV || 'development';
const config = require(`./env/${envFile}.js`);
logger.info(`Using ${envFile} environment`)

export default config;