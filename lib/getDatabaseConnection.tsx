import { createConnection, getConnectionManager } from "typeorm";
import "reflect-metadata";
import { Post } from "../src/entity/Post";
import { User } from "../src/entity/User";
import { Comment } from "../src/entity/Comment";
import ormConfig from "../ormconfig.json";

const getConnectionPromise = (async function () {
  const manager = getConnectionManager();
  if (manager.has("default")) {
    const defaultConnection = manager.get("default");
    if (defaultConnection.isConnected) {
      await defaultConnection.close();
    }
  }
  // @ts-ignore
  return createConnection({
    ...ormConfig,
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "192.168.2.11",
    entities: [Post, User, Comment],
  });
})();

const getDatabaseConnection = async () => {
  return getConnectionPromise;
};

export { getDatabaseConnection };
