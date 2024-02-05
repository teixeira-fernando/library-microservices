const {GenericContainer} = require('testcontainers');

const createMongoContainer = async () => {
  const env = {
    container: null,
    mongoUrl: null,
  };
  try {
    env.container = await new GenericContainer('mvertes/alpine-mongo:latest')
        .withExposedPorts(27017)
        .start();
    env.mongoUrl = `mongodb://localhost:${env.container.getMappedPort(27017)}`;
  } catch (err) {
    console.error(`Error while setting up:. ${JSON.stringify(err)}`);
    throw new Error(err);
  }
  return env;
};

const closeConnection = async (container) => {
  setTimeout(async () => {
    await container.stop();
  }, 5000);
  process.env.DB_URL = null;
};

module.exports = {
  createMongoContainer,
  closeConnection,
};
