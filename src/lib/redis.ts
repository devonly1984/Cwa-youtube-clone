import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10,'10s')
})

export { redis, ratelimit };