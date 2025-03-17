import { drizzle } from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless';
import { config } from '@/lib/config';

const sql = neon(config.drizzle.database);

const db = drizzle({client: sql})
export default db;