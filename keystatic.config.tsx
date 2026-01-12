import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'moshoubucheng/bikin',
  },

  ui: {
    brand: {
      name: '集团官网管理系统',
    },
    navigation: {
      '内容管理': ['properties', 'news'],
      '氢能源图库': ['energyGallery'],
      '全局设置': ['globalSettings'],
    },
  },

  singletons: {
    // 全局设置 - 解决 PM 提到的联系方式更换问题
    globalSettings: singleton({
      label: '全局设置',
      path: 'src/content/settings/global',
      schema: {
        // 公司信息
        companyName: fields.object({
          zh: fields.text({ label: '公司名称（中文）' }),
          ja: fields.text({ label: '会社名（日本語）' }),
          en: fields.text({ label: 'Company Name (English)' }),
        }, {
          label: '公司名称',
        }),

        // 联系方式 - 可随时在后台更换
        contact: fields.object({
          phone: fields.text({
            label: '联系电话',
            description: '显示在网站上的联系电话',
          }),
          email: fields.text({
            label: '联系邮箱',
          }),
          // 微信二维码 - 过期可随时更换
          wechatQR: fields.image({
            label: '微信二维码',
            description: '微信咨询二维码图片（建议尺寸：300x300px）',
            directory: 'src/assets/contact',
            publicPath: '/src/assets/contact/',
          }),
          wechatId: fields.text({
            label: '微信号',
            description: '显示在二维码下方',
          }),
          // Line 二维码
          lineQR: fields.image({
            label: 'Line 二维码',
            description: 'Line 咨询二维码图片（建议尺寸：300x300px）',
            directory: 'src/assets/contact',
            publicPath: '/src/assets/contact/',
          }),
          lineId: fields.text({
            label: 'Line ID',
            description: '显示在二维码下方',
          }),
        }, {
          label: '联系方式',
        }),

        // 社交媒体链接
        social: fields.object({
          youtube: fields.url({ label: 'YouTube 频道' }),
          twitter: fields.url({ label: 'Twitter/X' }),
          linkedin: fields.url({ label: 'LinkedIn' }),
        }, {
          label: '社交媒体',
        }),

        // SEO 默认设置
        seo: fields.object({
          defaultTitle: fields.object({
            zh: fields.text({ label: '默认标题（中文）' }),
            ja: fields.text({ label: 'デフォルトタイトル（日本語）' }),
            en: fields.text({ label: 'Default Title (English)' }),
          }),
          defaultDescription: fields.object({
            zh: fields.text({ label: '默认描述（中文）', multiline: true }),
            ja: fields.text({ label: 'デフォルト説明（日本語）', multiline: true }),
            en: fields.text({ label: 'Default Description (English)', multiline: true }),
          }),
        }, {
          label: 'SEO 设置',
        }),
      },
    }),
  },

  collections: {
    // 不动产 Collection
    properties: collection({
      label: '不动产 / 房源',
      slugField: 'slug',
      path: 'src/content/properties/*',
      format: { contentField: 'description' },
      schema: {
        slug: fields.slug({
          name: { label: 'URL 标识符' },
        }),

        // 多语言标题
        title: fields.object({
          zh: fields.text({
            label: '标题（中文）',
            validation: { isRequired: true },
          }),
          ja: fields.text({
            label: 'タイトル（日本語）',
            validation: { isRequired: true },
          }),
          en: fields.text({
            label: 'Title (English)',
            validation: { isRequired: true },
          }),
        }, {
          label: '房源标题',
        }),

        // 价格（数字便于排序筛选）
        price: fields.number({
          label: '价格',
          description: '单位：万元人民币',
          validation: { isRequired: true },
        }),

        // 货币单位
        currency: fields.select({
          label: '货币',
          options: [
            { label: '人民币 (CNY)', value: 'CNY' },
            { label: '日元 (JPY)', value: 'JPY' },
            { label: '美元 (USD)', value: 'USD' },
          ],
          defaultValue: 'CNY',
        }),

        // 位置（多语言）
        location: fields.object({
          zh: fields.text({ label: '位置（中文）' }),
          ja: fields.text({ label: '所在地（日本語）' }),
          en: fields.text({ label: 'Location (English)' }),
        }, {
          label: '房源位置',
        }),

        // 状态
        status: fields.select({
          label: '状态',
          options: [
            { label: '在售 / Available', value: 'available' },
            { label: '已售 / Sold', value: 'sold' },
            { label: '预约中 / Reserved', value: 'reserved' },
          ],
          defaultValue: 'available',
        }),

        // 图片列表 - PM 建议图片不带文字，所以只需一套图片
        images: fields.array(
          fields.image({
            label: '房源图片',
            description: '建议上传不含文字的图片（系统会自动压缩优化）',
            directory: 'src/assets/properties',
            publicPath: '/src/assets/properties/',
          }),
          {
            label: '房源图片',
            itemLabel: () => '房源图片',
          }
        ),

        // 特色/亮点（多语言列表）
        features: fields.array(
          fields.object({
            zh: fields.text({ label: '特色（中文）' }),
            ja: fields.text({ label: '特徴（日本語）' }),
            en: fields.text({ label: 'Feature (English)' }),
          }),
          {
            label: '房源特色',
            itemLabel: (props) => props.fields.zh.value || '新特色',
          }
        ),

        // 户型图
        layoutImage: fields.image({
          label: '户型图',
          description: '建议上传清晰的户型平面图',
          directory: 'src/assets/properties',
          publicPath: '/src/assets/properties/',
        }),

        // 面积信息
        area: fields.number({
          label: '建筑面积',
          description: '单位：平方米',
        }),

        // 详细描述（富文本，多语言）
        description: fields.mdx({
          label: '详细描述',
          description: '支持 Markdown 格式',
        }),

        // 发布日期
        publishDate: fields.date({
          label: '发布日期',
          defaultValue: { kind: 'today' },
        }),

        // 是否置顶
        featured: fields.checkbox({
          label: '首页推荐',
          defaultValue: false,
        }),
      },
    }),

    // 新闻 Collection
    news: collection({
      label: '新闻动态',
      slugField: 'slug',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({
          name: { label: 'URL 标识符' },
        }),

        // 多语言标题
        title: fields.object({
          zh: fields.text({
            label: '标题（中文）',
            validation: { isRequired: true },
          }),
          ja: fields.text({
            label: 'タイトル（日本語）',
            validation: { isRequired: true },
          }),
          en: fields.text({
            label: 'Title (English)',
            validation: { isRequired: true },
          }),
        }, {
          label: '新闻标题',
        }),

        // 发布日期
        date: fields.date({
          label: '发布日期',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),

        // 分类（氢能技术 / 市场动态）
        category: fields.select({
          label: '分类',
          options: [
            { label: '氢能技术 / Tech', value: 'tech' },
            { label: '市场动态 / Market', value: 'market' },
            { label: '公司新闻 / Company', value: 'company' },
            { label: '不动产 / Estate', value: 'estate' },
          ],
          defaultValue: 'tech',
        }),

        // 封面图
        coverImage: fields.image({
          label: '封面图片',
          directory: 'src/assets/news',
          publicPath: '/src/assets/news/',
        }),

        // 视频链接（YouTube 等）
        videoUrl: fields.url({
          label: '视频链接',
          description: '支持 YouTube、Bilibili 等视频链接',
        }),

        // 图片画廊
        galleryImages: fields.array(
          fields.image({
            label: '图片',
            directory: 'src/assets/news',
            publicPath: '/src/assets/news/',
          }),
          {
            label: '图片画廊',
            itemLabel: () => '画廊图片',
          }
        ),

        // 摘要（多语言）
        excerpt: fields.object({
          zh: fields.text({ label: '摘要（中文）', multiline: true }),
          ja: fields.text({ label: '要約（日本語）', multiline: true }),
          en: fields.text({ label: 'Excerpt (English)', multiline: true }),
        }, {
          label: '新闻摘要',
        }),

        // 正文内容
        content: fields.mdx({
          label: '正文内容',
          description: '支持 Markdown 格式',
        }),

        // 是否置顶
        featured: fields.checkbox({
          label: '首页推荐',
          defaultValue: false,
        }),
      },
    }),

    // 氢能源图库
    energyGallery: collection({
      label: '氢能图库',
      slugField: 'slug',
      path: 'src/content/energy-gallery/*',
      schema: {
        slug: fields.slug({
          name: { label: 'URL 标识符' },
        }),

        // 多语言标题
        title: fields.object({
          zh: fields.text({ label: '标题（中文）' }),
          ja: fields.text({ label: 'タイトル（日本語）' }),
          en: fields.text({ label: 'Title (English)' }),
        }, {
          label: '图片标题',
        }),

        // 图片
        image: fields.image({
          label: '图片',
          description: '加氢站、展会照片等（建议不含文字）',
          directory: 'src/assets/energy',
          publicPath: '/src/assets/energy/',
          validation: { isRequired: true },
        }),

        // 分类
        category: fields.select({
          label: '分类',
          options: [
            { label: '加氢站 / Station', value: 'station' },
            { label: '展会活动 / Exhibition', value: 'exhibition' },
            { label: '技术设备 / Equipment', value: 'equipment' },
            { label: '合作伙伴 / Partners', value: 'partners' },
          ],
          defaultValue: 'station',
        }),

        // 描述
        description: fields.object({
          zh: fields.text({ label: '描述（中文）', multiline: true }),
          ja: fields.text({ label: '説明（日本語）', multiline: true }),
          en: fields.text({ label: 'Description (English)', multiline: true }),
        }, {
          label: '图片描述',
        }),

        // 排序
        order: fields.number({
          label: '排序',
          description: '数字越小越靠前',
          defaultValue: 0,
        }),
      },
    }),
  },
});