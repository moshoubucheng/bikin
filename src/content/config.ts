import { defineCollection, z } from 'astro:content';

// 多语言文本 schema
const multilingualText = z.object({
  zh: z.string().optional(),
  ja: z.string().optional(),
  en: z.string().optional(),
});

// 不动产 Collection Schema
const propertiesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: multilingualText,
      price: z.number(),
      currency: z.enum(['CNY', 'JPY', 'USD']).default('CNY'),
      location: multilingualText,
      status: z.enum(['available', 'sold', 'reserved']).default('available'),
      images: z.array(image()).optional(),
      features: z.array(multilingualText).optional(),
      layoutImage: image().optional(),
      area: z.number().optional(),
      publishDate: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

// 新闻 Collection Schema
const newsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: multilingualText,
      date: z.string(),
      category: z.enum(['tech', 'market', 'company', 'estate']).default('tech'),
      coverImage: image().optional(),
      videoUrl: z.string().url().optional(),
      galleryImages: z.array(image()).optional(),
      excerpt: multilingualText.optional(),
      featured: z.boolean().default(false),
    }),
});

// 氢能图库 Collection Schema
const energyGalleryCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: multilingualText,
      image: image(),
      category: z.enum(['station', 'exhibition', 'equipment', 'partners']).default('station'),
      description: multilingualText.optional(),
      order: z.number().default(0),
    }),
});

// 全局设置 Singleton Schema
const settingsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      companyName: multilingualText.optional(),
      contact: z
        .object({
          phone: z.string().optional(),
          email: z.string().email().optional(),
          wechatQR: image().optional(),
          wechatId: z.string().optional(),
          lineQR: image().optional(),
          lineId: z.string().optional(),
        })
        .optional(),
      social: z
        .object({
          youtube: z.string().url().optional(),
          twitter: z.string().url().optional(),
          linkedin: z.string().url().optional(),
        })
        .optional(),
      seo: z
        .object({
          defaultTitle: multilingualText.optional(),
          defaultDescription: multilingualText.optional(),
        })
        .optional(),
    }),
});

export const collections = {
  properties: propertiesCollection,
  news: newsCollection,
  'energy-gallery': energyGalleryCollection,
  settings: settingsCollection,
};
