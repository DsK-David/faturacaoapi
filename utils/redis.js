
import redis from "redis";

const Redis = redis.createClient();

Redis.on("error", (err) => {
  console.log("Redis error:", err);
});

export default Redis;
