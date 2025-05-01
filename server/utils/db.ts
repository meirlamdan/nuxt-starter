import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../db/schema';

export function useDb() {
    return drizzle(process.env.DB_FILE_NAME!, { schema, logger: true });
}