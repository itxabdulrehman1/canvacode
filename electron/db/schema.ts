import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Simple system table to verify migrations and initialization
export const systemMetadata = sqliteTable('system_metadata', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

// Users Table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // UUID
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
})

// Sessions Table
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(), // Secure Session ID
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
})

// Remember Me Tokens Table
export const rememberTokens = sqliteTable('remember_tokens', {
  id: text('id').primaryKey(), // Token ID
  tokenHash: text('token_hash').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

// Password Reset Tokens Table
export const passwordResetTokens = sqliteTable('password_reset_tokens', {
  id: text('id').primaryKey(), // Token ID
  tokenHash: text('token_hash').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  isUsed: integer('is_used', { mode: 'boolean' }).notNull().default(false),
})

// Application Metadata Table
export const applicationMetadata = sqliteTable('application_metadata', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
})
