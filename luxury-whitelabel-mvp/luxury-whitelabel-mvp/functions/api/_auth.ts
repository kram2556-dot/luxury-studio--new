import type { Env } from './_data';

const COOKIE_NAME = 'athir_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function base64Url(input: ArrayBuffer | string): string {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  return atob(base64);
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64Url(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value)));
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

export async function verifyCredentials(email: string, password: string, env: Env): Promise<boolean> {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.SESSION_SECRET) return false;
  const configuredEmail = env.ADMIN_EMAIL;
  const configuredPassword = env.ADMIN_PASSWORD;
  return constantTimeEqual(email.trim().toLowerCase(), configuredEmail.trim().toLowerCase()) && constantTimeEqual(password, configuredPassword);
}

export async function createSession(email: string, env: Env): Promise<string> {
  if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET is required');
  const secret = env.SESSION_SECRET;
  const payload = base64Url(JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }));
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  const cookie = request.headers.get('Cookie') || '';
  const token = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (!env.SESSION_SECRET) return false;
  const secret = env.SESSION_SECRET;
  const expected = await sign(payload, secret);
  if (!constantTimeEqual(signature, expected)) return false;
  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as { exp?: number };
    return Boolean(parsed.exp && parsed.exp > Math.floor(Date.now() / 1000));
  } catch {
    return false;
  }
}

export function sessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}
