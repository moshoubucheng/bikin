import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
site: 'https://bikin.759nxrb6x4.workers.dev',  
output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),

  // i18n 国际化配置
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'ja', 'en'],
    routing: {
      prefixDefaultLocale: true, // 所有语言都带前缀: /zh/, /ja/, /en/
    },
    fallback: {
      ja: 'zh',
      en: 'zh',
    },
  },

  // 图像优化配置 - 解决行政人员上传大图问题
  image: {
    // 使用 Sharp 进行图像处理
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false, // 允许处理大图
      },
    },
    // 远程图像允许的域名（Keystatic 上传的图片）
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },

  // 构建优化
  build: {
    // 内联小于 4KB 的资源
    inlineStylesheets: 'auto',
  },

  // Vite 配置
  vite: {
    build: {
      // 资源压缩
      cssMinify: true,
      minify: 'esbuild',
    },
  },

  integrations: [
    tailwind({
      // 使用自定义配置
      configFile: './tailwind.config.mjs',
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
});
