const dotenv = require('dotenv');

dotenv.config();
const envFile = process.env.NODE_ENV || 'development';
const config = require(`./env/${envFile}.js`);

module.exports = config;
