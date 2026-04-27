import type { APIRoute } from 'astro';
import {
  authCookieMaxAge,
  authCookieName,
  createSessionToken,
  createUser,
  validateCredentials,
} from '../../../lib/authStore';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const { username = '', password = '' } = await request.json().catch(() => ({}));
  const validationError = validateCredentials(String(username), String(password));

  if (validationError) {
    return Response.json({ detail: validationError }, { status: 400 });
  }

  try {
    const user = createUser(String(username), String(password));
    const token = createSessionToken(user);

    cookies.set(authCookieName, token, {
      httpOnly: true,
      maxAge: authCookieMaxAge,
      path: '/',
      sameSite: 'strict',
      secure: import.meta.env.PROD,
    });

    return Response.json({ user });
  } catch (error) {
    return Response.json(
      { detail: error instanceof Error ? error.message : 'Registration failed.' },
      { status: 409 },
    );
  }
};
