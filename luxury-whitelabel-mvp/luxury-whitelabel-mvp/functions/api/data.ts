import { json, readSiteData, type Env } from './_data';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const result = await readSiteData(env);
    return json({ data: result.data, source: result.source });
  } catch {
    const fallback = await readSiteData({});
    return json({ data: fallback.data, source: 'fallback', warning: 'KV unavailable' });
  }
};
