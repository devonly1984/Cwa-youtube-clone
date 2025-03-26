import { Client } from "@upstash/workflow";
import { config } from "./config";

export const qstashClient = new Client({ token: config.qstash.sending.token });