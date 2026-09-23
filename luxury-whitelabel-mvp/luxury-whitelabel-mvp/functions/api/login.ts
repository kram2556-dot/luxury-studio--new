import { createSession, sessionCookie, verifyCredentials } from './_auth';
import { json, type Env } from './_data';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as { email?: string; password?: string };
    if (!body.email || !body.password || !(await verifyCredentials(body.email, body.password, env))) {
      return json({ ok: false, error: 'بيانات الدخول غير صحيحة.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }
    const token = await createSession(body.email, env);
    return json({ ok: true, expiresIn: 60 * 60 * 8 }, { headers: { 'Set-Cookie': sessionCookie(token) } });
  } catch {
    return json({ ok: false, error: 'طلب تسجيل الدخول غير صالح.' }, { status: 400 });
  }
};
