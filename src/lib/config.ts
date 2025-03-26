export const config = {
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    urls: {
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
      fallback: "/",
    },
    wehook: {
      signingSecret: process.env.WH_SIGNING_SECRET
    }
  },
  drizzle: {
    database: process.env.DATABASE_URL!
  },
  redis: {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  },
  mux: {
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
    signingSecret: process.env.MUX_SIGNING_SECRET
  },
  qstash: {
    sending: {
    url: process.env.QSTASH_URL,
    token:process.env.QSTASH_TOKEN
    },
    recieving: {
      currentSigning: process.env.QSTASH_CURRENT_SIGNING_KEY,
      nextSigning: process.env.QSTASH_NEXT_SIGNING_KEY
    }
    
  },
  vercel: {
    url: process.env.VERCEL_URL
  }
};