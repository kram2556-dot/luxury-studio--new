import { cloneData, defaultData, SiteData } from '../data';

export const STORAGE_KEY = 'athir-studio-mvp-data-v1';

export function loadSiteData(): SiteData {
  if (typeof window === 'undefined') return cloneData(defaultData);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneData(defaultData);
    return { ...cloneData(defaultData), ...JSON.parse(raw) } as SiteData;
  } catch {
    return cloneData(defaultData);
  }
}

export function saveSiteData(data: SiteData): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function resetSiteData(): SiteData {
  const fresh = cloneData(defaultData);
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be disabled in a private browsing context.
  }
  return fresh;
}

export function downloadText(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function exportDataJs(data: SiteData): string {
  const json = JSON.stringify(data, null, 2);
  return `// White-label Studio — exported local data\n// Import this file in /admin or replace the seed data after review.\nexport const siteData = ${json};\n`;
}

export function exportDataJson(data: SiteData): string {
  return JSON.stringify(data, null, 2);
}

export function readJsonFile(file: File): Promise<SiteData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const source = String(reader.result);
        let value: unknown;
        if (file.name.toLowerCase().endsWith('.js')) {
          const match = source.match(/export\s+const\s+siteData\s*=\s*([\s\S]*);\s*$/);
          if (!match) throw new Error('invalid-data');
          value = JSON.parse(match[1]);
        } else {
          value = JSON.parse(source);
        }
        if (!value || typeof value !== 'object') {
          throw new Error('invalid-data');
        }
        const record = value as Partial<SiteData>;
        if (!record.brand || !record.projects) throw new Error('invalid-data');
        resolve(value as SiteData);
      } catch {
        reject(new Error('تعذر قراءة ملف البيانات. تأكد أنه JSON صالح صادر من لوحة الإدارة.'));
      }
    };
    reader.onerror = () => reject(new Error('تعذر قراءة الملف.'));
    reader.readAsText(file);
  });
}

export function compressToWebP(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.78, maxBytes = 200 * 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة الصورة.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('الملف ليس صورة صالحة.'));
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('المتصفح لا يدعم ضغط الصور.'));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let currentQuality = quality;
        let output = canvas.toDataURL('image/webp', currentQuality);
        while (approximateBytes(output) > maxBytes && currentQuality > 0.42) {
          currentQuality -= 0.06;
          output = canvas.toDataURL('image/webp', currentQuality);
        }
        if (approximateBytes(output) > maxBytes) {
          reject(new Error('تعذر ضغط الصورة إلى أقل من 200 كيلوبايت. اختر صورة أبسط أو أصغر.'));
          return;
        }
        resolve(output);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function approximateBytes(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1] || '';
  return Math.floor(base64.length * 0.75);
}
