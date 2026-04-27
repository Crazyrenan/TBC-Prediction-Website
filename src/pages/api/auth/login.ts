import type { APIRoute } from 'astro';
import {
  authenticateUser,
  authCookieMaxAge,
  authCookieName,
  createSessionToken,
  validateCredentials,
} from '../../../lib/authStore';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const { username = '', password = '' } = await request.json().catch(() => ({}));
  const validationError = validateCredentials(String(username), String(password));

  if (validationError) {
    return Response.json({ detail: validationError }, { status: 400 });
  }

  const user = authenticateUser(String(username), String(password));

  if (!user) {
    return Response.json({ detail: 'Username or password is incorrect.' }, { status: 401 });
  }

  cookies.set(authCookieName, createSessionToken(user), {
    httpOnly: true,
    maxAge: authCookieMaxAge,
    path: '/',
    sameSite: 'strict',
    secure: import.meta.env.PROD,
  });

  return Response.json({ user });
};
