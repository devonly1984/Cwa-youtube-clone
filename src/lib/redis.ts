import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { config } from "./config";
const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
});
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10,'10s')
})

export { redis, ratelimit };