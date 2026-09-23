import { isAuthenticated } from './_auth';
import { isValidSiteData, json, type Env } from './_data';
import type { SiteData } from '../../src/data';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthenticated(request, env))) {
    return json({ ok: false, error: 'يجب تسجيل الدخول قبل الحفظ.' }, { status: 401 });
  }
  if (!env.SITE_KV) return json({ ok: false, error: 'SITE_KV غير مربوط بهذا المشروع.' }, { status: 503 });
  try {
    const body = await request.json() as { data?: SiteData };
    if (!isValidSiteData(body.data)) return json({ ok: false, error: 'بنية البيانات غير صالحة.' }, { status: 422 });
    const { projects, ...content } = body.data;
    await Promise.all([
      env.SITE_KV.put('site_content', JSON.stringify(content)),
      env.SITE_KV.put('site_projects', JSON.stringify(projects)),
    ]);
    return json({ ok: true, savedAt: new Date().toISOString(), keys: ['site_content', 'site_projects'] });
  } catch {
    return json({ ok: false, error: 'تعذر حفظ البيانات في KV.' }, { status: 400 });
  }
};
