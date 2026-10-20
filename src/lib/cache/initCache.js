import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import { env } from "../env/env.js";

export const cacheProvider = new RedisCacheProvider({
  host: env.redis.CACHE_REDIS_HOST,
  port: env.redis.CACHE_REDIS_PORT,
  password: env.redis.CACHE_REDIS_PASSWORD || "",
});
