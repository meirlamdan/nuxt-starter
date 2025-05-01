import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  // a file defining our data structure we'll create in a minute
  schema: './server/db/schema.ts',

  // the type of database we're using
  dialect: 'sqlite',

  // the file where our database will be stored
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});