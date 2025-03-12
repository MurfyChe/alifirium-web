import cassandra from "cassandra-driver";
import dotenv from "dotenv";
dotenv.config();

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_HOST || "127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "shop",
});

client.connect()
  .then(() => console.log("Connected to Cassandra"))
  .catch((err) => console.error("Cassandra connection error:", err));

export default client;
