/**
 * HTML 内容安全过滤工具
 * 防止 XSS 攻击
 */

/**
 * 简单的 HTML 过滤器
 * 移除危险标签和属性
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // 移除 script 标签及内容
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 移除 style 标签及内容
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // 移除事件处理器属性
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // 移除 javascript: 协议链接
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  // 移除 iframe 标签
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 移除 object 标签
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');

  // 移除 embed 标签
  sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');

  // 移除 form 标签
  sanitized = sanitized.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');

  return sanitized;
}

/**
 * 格式化日期为本地化格式
 */
export function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const locale = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * 格式化日期为短格式
 */
export function formatDateShort(dateStr: string, lang: string): string {
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const locale = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}
