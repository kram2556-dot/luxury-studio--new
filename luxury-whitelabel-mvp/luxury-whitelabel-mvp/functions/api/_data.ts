import { defaultData, type Project, type SiteData } from '../../src/data';

export type Env = {
  SITE_KV?: KVNamespace;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
};

export const json = (body: unknown, init: ResponseInit = {}) => new Response(JSON.stringify(body), {
  ...init,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...(init.headers || {}) },
});

export function mergeStoredData(content: Partial<SiteData> | null, projects: Project[] | null): SiteData {
  return {
    ...defaultData,
    ...(content || {}),
    brand: { ...defaultData.brand, ...(content?.brand || {}) },
    seo: { ...defaultData.seo, ...(content?.seo || {}) },
    contact: { ...defaultData.contact, ...(content?.contact || {}) },
    comparison: { ...defaultData.comparison, ...(content?.comparison || {}) },
    ui: { ...(defaultData.ui || {}), ...(content?.ui || {}) },
    translations: content?.translations || defaultData.translations,
    heroSlides: content?.heroSlides?.length ? content.heroSlides : defaultData.heroSlides,
    stats: content?.stats?.length ? content.stats : defaultData.stats,
    categories: content?.categories?.length ? content.categories : defaultData.categories,
    materials: content?.materials?.length ? content.materials : defaultData.materials,
    packages: content?.packages?.length ? content.packages : defaultData.packages,
    process: content?.process?.length ? content.process : defaultData.process,
    partners: content?.partners?.length ? content.partners : defaultData.partners,
    projects: projects?.length ? projects : (content?.projects?.length ? content.projects : defaultData.projects),
  };
}

export async function readSiteData(env: Env): Promise<{ data: SiteData; source: 'kv' | 'fallback' }> {
  if (!env.SITE_KV) return { data: defaultData, source: 'fallback' };
  const [content, projects] = await Promise.all([
    env.SITE_KV.get('site_content', 'json') as Promise<Partial<SiteData> | null>,
    env.SITE_KV.get('site_projects', 'json') as Promise<Project[] | null>,
  ]);
  return { data: mergeStoredData(content, projects), source: content || projects ? 'kv' : 'fallback' };
}

export function isValidSiteData(value: unknown): value is SiteData {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<SiteData>;
  return Boolean(record.brand && record.contact && Array.isArray(record.projects) && Array.isArray(record.categories));
}
