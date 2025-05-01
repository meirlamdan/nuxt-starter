import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: text().primaryKey().default(sql`(uuid())`),
    firstName: text().notNull(),
    lastName: text().notNull(),
    email: text().notNull().unique(),
    role: text({ enum: ["user", "admin", "superadmin"] }).notNull().default('user'),
    password: text().notNull(),
    createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type User = typeof usersTable.$inferSelect


