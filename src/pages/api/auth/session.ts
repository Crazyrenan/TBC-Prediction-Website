import type { APIRoute } from 'astro';
import { authCookieName, verifySessionToken } from '../../../lib/authStore';

export const prerender = false;

export const GET: APIRoute = ({ cookies }) => {
  const session = verifySessionToken(cookies.get(authCookieName)?.value);

  if (!session) {
    return Response.json({ user: null }, { status: 401 });
  }

  return Response.json({
    user: {
      id: session.sub,
      username: session.username,
      role: session.role,
    },
  });
};
