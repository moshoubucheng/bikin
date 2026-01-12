import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

/**
 * 从 URL 路径中获取当前语言
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * 获取翻译函数
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

/**
 * 生成带语言前缀的路径
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  // 移除开头的斜杠
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // 移除已有的语言前缀
  const pathWithoutLang = cleanPath.replace(/^(zh|ja|en)\//, '');
  return `/${lang}/${pathWithoutLang}`;
}

/**
 * 获取所有语言的路径映射（用于语言切换）
 */
export function getLanguagePaths(currentPath: string): Record<Lang, string> {
  const pathWithoutLang = currentPath.replace(/^\/(zh|ja|en)/, '') || '/';

  return {
    zh: `/zh${pathWithoutLang}`,
    ja: `/ja${pathWithoutLang}`,
    en: `/en${pathWithoutLang}`,
  };
}

/**
 * 获取多语言内容
 * 用于从 CMS 内容中获取对应语言的字段
 */
export function getLocalizedContent<T>(
  content: {
    zh?: T;
    ja?: T;
    en?: T;
  },
  lang: Lang
): T | undefined {
  return content[lang] || content[defaultLang];
}

/**
 * 检查是否为有效语言
 */
export function isValidLang(lang: string): lang is Lang {
  return lang in languages;
}

/**
 * 获取语言显示名称
 */
export function getLanguageName(lang: Lang): string {
  return languages[lang];
}
