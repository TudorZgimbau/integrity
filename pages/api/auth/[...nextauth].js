import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import "dotenv/config";

export default NextAuth({
  adapter: UpstashRedisAdapter(
    new Redis({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_TOKEN,
    })
  ),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
