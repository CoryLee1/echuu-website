import { zhCN, type Dict } from './zh-CN';
import { ja } from './ja';
import { en } from './en';
import { ko } from './ko';

export const LOCALES = ['zh-CN', 'ja', 'en', 'ko'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const DICTS: Record<Locale, Dict> = { 'zh-CN': zhCN, ja, en, ko };

/** 语言菜单直接显示语言名，不用国旗。 */
export const LOCALE_NAMES: Record<Locale, string> = {
  'zh-CN': '简体中文',
  ja: '日本語',
  en: 'English',
  ko: '한국어',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** 首次访问按浏览器语言选择；不按 IP 强制跳转，用户手动选择优先。 */
export function detectLocale(navigatorLanguages: readonly string[]): Locale {
  for (const raw of navigatorLanguages) {
    const tag = raw.toLowerCase();
    if (tag.startsWith('zh')) return 'zh-CN';
    if (tag.startsWith('ja')) return 'ja';
    if (tag.startsWith('ko')) return 'ko';
    if (tag.startsWith('en')) return 'en';
  }
  return DEFAULT_LOCALE;
}

export const STORED_LOCALE_KEY = 'echuu.website.locale';

export function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORED_LOCALE_KEY);
    return isLocale(value ?? undefined) ? (value as Locale) : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORED_LOCALE_KEY, locale);
  } catch {
    /* private mode — 手动选择只在本次会话生效 */
  }
}

/** 简单占位替换：{n} / {max}。 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type { Dict };
