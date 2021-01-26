import { createConnection, getConnectionManager } from "typeorm";

const getConnectionPromise = (async function () {
  const manager = getConnectionManager();
  if (manager.has("default")) {
    const defaultConnection = manager.get("default");
    if (defaultConnection.isConnected) {
      return defaultConnection;
    }
  }
  return createConnection();
})();

const getDatabaseConnection = async () => {
  return getConnectionPromise;
};

export { getDatabaseConnection };
