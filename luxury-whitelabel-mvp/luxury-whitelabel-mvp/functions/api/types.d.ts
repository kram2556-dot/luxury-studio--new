interface KVNamespace {
  get<T = unknown>(key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream'): Promise<T | null>;
  put(key: string, value: string, options?: { expiration?: number; expirationTtl?: number; metadata?: unknown }): Promise<void>;
}

type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string | undefined>;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;
