import type { APIRoute } from 'astro';
import { authCookieName } from '../../../lib/authStore';

export const prerender = false;

export const POST: APIRoute = ({ cookies }) => {
  cookies.delete(authCookieName, { path: '/' });
  return Response.json({ ok: true });
};
