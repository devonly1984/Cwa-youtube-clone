export const config = {
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    urls: {
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
      fallback: "/",
    },
  },
  drizzle: {
    database: process.env.DATABASE_URL!
  }
};