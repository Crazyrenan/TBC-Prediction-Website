import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type PublicUser = {
  id: string;
  username: string;
  role: string;
  createdAt: string;
};

type StoredUser = PublicUser & {
  passwordHash: string;
};

const usersPath = join(process.cwd(), 'data', 'users.json');
const sessionSecret = process.env.SESSION_SECRET || 'pulmoai-local-dev-secret';
const tokenMaxAgeSeconds = 60 * 60 * 8;

function ensureStore() {
  if (!existsSync(usersPath)) {
    mkdirSync(dirname(usersPath), { recursive: true });
    writeFileSync(usersPath, '[]\n', 'utf-8');
  }
}

function readUsers(): StoredUser[] {
  ensureStore();
  return JSON.parse(readFileSync(usersPath, 'utf-8')) as StoredUser[];
}

function writeUsers(users: StoredUser[]) {
  ensureStore();
  writeFileSync(usersPath, `${JSON.stringify(users, null, 2)}\n`, 'utf-8');
}

function publicUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derived = pbkdf2Sync(password, salt, 120000, 32, 'sha256').toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const actual = Buffer.from(pbkdf2Sync(password, salt, 120000, 32, 'sha256').toString('hex'));
  const expected = Buffer.from(hash);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function sign(payload: string) {
  return createHmac('sha256', sessionSecret).update(payload).digest('hex');
}

function encode(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decode<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf-8')) as T;
}

export function validateCredentials(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();

  if (!/^[a-z0-9._-]{3,32}$/.test(normalizedUsername)) {
    return 'Username must be 3-32 characters and use letters, numbers, dots, underscores, or hyphens.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }

  return null;
}

export function createUser(username: string, password: string) {
  const users = readUsers();
  const normalizedUsername = username.trim().toLowerCase();

  if (users.some((user) => user.username === normalizedUsername)) {
    throw new Error('Username is already registered.');
  }

  const user: StoredUser = {
    id: randomBytes(12).toString('hex'),
    username: normalizedUsername,
    role: 'Clinical Staff',
    createdAt: new Date().toISOString(),
    passwordHash: hashPassword(password),
  };

  users.push(user);
  writeUsers(users);

  return publicUser(user);
}

export function authenticateUser(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = readUsers().find((candidate) => candidate.username === normalizedUsername);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return publicUser(user);
}

export function createSessionToken(user: PublicUser) {
  const payload = encode({
    sub: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + tokenMaxAgeSeconds,
  });

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature || sign(payload) !== signature) return null;

  const session = decode<{ sub: string; username: string; role: string; exp: number }>(payload);
  if (session.exp < Math.floor(Date.now() / 1000)) return null;

  return session;
}

export const authCookieName = 'pulmoai_session';
export const authCookieMaxAge = tokenMaxAgeSeconds;
