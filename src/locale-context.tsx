import { createContext, useContext } from 'react';
import type { Locale, Dict } from './i18n';

export type LocaleValue = { locale: Locale; t: Dict };

export const LocaleContext = createContext<LocaleValue | null>(null);

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside LocaleContext');
  return value;
}

/** 生成带语言前缀的站内路径。 */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
