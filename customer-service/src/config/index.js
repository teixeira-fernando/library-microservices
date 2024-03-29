const dotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({path: configFile});
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  APPLICATION_URL: process.env.APPLICATION_URL,
  BASE_URL: process.env.APPLICATION_URL + ':' + process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  CUSTOMER_SERVICE: 'customer_service',
};
