import cassandra from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

export const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINT!],
  localDataCenter: process.env.CASSANDRA_DATACENTER!,
  keyspace: process.env.CASSANDRA_KEYSPACE!,
});
