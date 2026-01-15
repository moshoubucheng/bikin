// 支持的语言列表
export const languages = {
  zh: '简体中文',
  ja: '日本語',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

// UI 翻译字典
export const ui = {
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.energy': '氢能源',
    'nav.estate': '不动产',
    'nav.news': '新闻动态',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',

    // 首页
    'home.hero.title': '引领未来能源与生活方式',
    'home.hero.subtitle': '致力于氢能源技术创新与高端不动产投资',
    'home.energy.title': '氢能源事业',
    'home.energy.desc': '清洁能源解决方案，助力可持续发展',
    'home.energy.cta': '了解更多',
    'home.estate.title': '不动产投资',
    'home.estate.desc': '精选全球优质物业，专业投资管理服务',
    'home.estate.cta': '查看房源',
    'home.about.title': '关于我们',
    'home.about.desc': '我们是一家专注于氢能源技术创新与高端不动产投资的综合性企业集团。凭借前瞻性的战略眼光和专业的运营团队，我们致力于为客户创造可持续的价值。',

    // 氢能源
    'energy.hero.title': '氢能源解决方案',
    'energy.hero.subtitle': '推动绿色能源革命，构建低碳未来',
    'energy.gallery.title': '项目展示',
    'energy.gallery.desc': '加氢站建设、行业展会、技术创新成果展示',
    'energy.news.title': '行业动态',
    'energy.tech.title': '技术创新',
    'energy.market.title': '市场资讯',

    // 不动产
    'estate.hero.title': '全球精选物业',
    'estate.hero.subtitle': '专业投资顾问，助您把握置业良机',
    'estate.filter.all': '全部',
    'estate.filter.available': '在售',
    'estate.filter.sold': '已售',
    'estate.featured': '推荐',
    'estate.sample.title': '示例房源',
    'estate.sample.location': '东京都港区',
    'estate.detail.price': '价格',
    'estate.detail.location': '位置',
    'estate.detail.features': '特色',
    'estate.detail.layout': '户型图',
    'estate.detail.contact': '联系咨询',
    'estate.detail.description': '详细描述',
    'estate.detail.noDescription': '暂无详细描述',
    'estate.detail.publishedAt': '发布日期',

    // 新闻
    'news.noContent': '暂无内容',
    'news.gallery': '图片画廊',
    'news.related': '相关新闻',

    // 联系方式
    'contact.title': '联系我们',
    'contact.wechat': '微信咨询',
    'contact.line': 'Line 咨询',
    'contact.phone': '电话咨询',
    'contact.scan': '扫码添加',
    'contact.estateDesc': '扫码添加微信或 Line，获取专业置业咨询',
    'contact.interested': '对这套房源感兴趣？',
    'contact.interestedDesc': '联系我们获取更多信息和专业咨询服务',

    // 通用
    'common.learnMore': '了解更多',
    'common.viewAll': '查看全部',
    'common.back': '返回',
    'common.close': '关闭',

    // 页脚
    'footer.links': '快速链接',
  },
  ja: {
    // ナビゲーション
    'nav.home': 'ホーム',
    'nav.energy': '水素エネルギー',
    'nav.estate': '不動産',
    'nav.news': 'ニュース',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',

    // ホームページ
    'home.hero.title': '未来のエネルギーとライフスタイルをリード',
    'home.hero.subtitle': '水素エネルギー技術革新と高級不動産投資に注力',
    'home.energy.title': '水素エネルギー事業',
    'home.energy.desc': 'クリーンエネルギーソリューションで持続可能な発展を支援',
    'home.energy.cta': '詳細を見る',
    'home.estate.title': '不動産投資',
    'home.estate.desc': '世界の優良物件を厳選、専門的な投資管理サービス',
    'home.estate.cta': '物件を見る',
    'home.about.title': '私たちについて',
    'home.about.desc': '私たちは、水素エネルギー技術革新と高級不動産投資に特化した総合企業グループです。先見性のある戦略的視点と専門的な運営チームにより、お客様に持続可能な価値を創造することに努めています。',

    // 水素エネルギー
    'energy.hero.title': '水素エネルギーソリューション',
    'energy.hero.subtitle': 'グリーンエネルギー革命を推進し、低炭素の未来を構築',
    'energy.gallery.title': 'プロジェクト紹介',
    'energy.gallery.desc': '水素ステーション建設、業界展示会、技術革新成果の紹介',
    'energy.news.title': '業界ニュース',
    'energy.tech.title': '技術革新',
    'energy.market.title': '市場情報',

    // 不動産
    'estate.hero.title': '世界厳選物件',
    'estate.hero.subtitle': '専門投資アドバイザーがお客様の不動産投資をサポート',
    'estate.filter.all': 'すべて',
    'estate.filter.available': '販売中',
    'estate.filter.sold': '売却済み',
    'estate.featured': 'おすすめ',
    'estate.sample.title': 'サンプル物件',
    'estate.sample.location': '東京都港区',
    'estate.detail.price': '価格',
    'estate.detail.location': '所在地',
    'estate.detail.features': '特徴',
    'estate.detail.layout': '間取り図',
    'estate.detail.contact': 'お問い合わせ',
    'estate.detail.description': '詳細説明',
    'estate.detail.noDescription': '詳細説明はありません',
    'estate.detail.publishedAt': '掲載日',

    // ニュース
    'news.noContent': 'コンテンツがありません',
    'news.gallery': 'フォトギャラリー',
    'news.related': '関連ニュース',

    // 連絡先
    'contact.title': 'お問い合わせ',
    'contact.wechat': 'WeChat',
    'contact.line': 'Line',
    'contact.phone': '電話',
    'contact.scan': 'QRコードをスキャン',
    'contact.estateDesc': 'WeChatまたはLineでお気軽にお問い合わせください',
    'contact.interested': 'この物件に興味がありますか？',
    'contact.interestedDesc': 'お問い合わせいただくと、詳細情報と専門的なアドバイスをご提供します',

    // 共通
    'common.learnMore': '詳細を見る',
    'common.viewAll': 'すべて見る',
    'common.back': '戻る',
    'common.close': '閉じる',

    // フッター
    'footer.links': 'リンク',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.energy': 'Hydrogen Energy',
    'nav.estate': 'Real Estate',
    'nav.news': 'News',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',

    // Homepage
    'home.hero.title': 'Leading Future Energy & Lifestyle',
    'home.hero.subtitle': 'Committed to hydrogen energy innovation and premium real estate investment',
    'home.energy.title': 'Hydrogen Energy',
    'home.energy.desc': 'Clean energy solutions for sustainable development',
    'home.energy.cta': 'Learn More',
    'home.estate.title': 'Real Estate Investment',
    'home.estate.desc': 'Curated global properties with professional management',
    'home.estate.cta': 'View Properties',
    'home.about.title': 'About Us',
    'home.about.desc': 'We are a comprehensive enterprise group focused on hydrogen energy technology innovation and premium real estate investment. With forward-thinking strategic vision and professional operations team, we are committed to creating sustainable value for our clients.',

    // Hydrogen Energy
    'energy.hero.title': 'Hydrogen Energy Solutions',
    'energy.hero.subtitle': 'Driving the green energy revolution for a low-carbon future',
    'energy.gallery.title': 'Project Gallery',
    'energy.gallery.desc': 'Hydrogen stations, industry exhibitions, and technology innovation showcase',
    'energy.news.title': 'Industry News',
    'energy.tech.title': 'Technology Innovation',
    'energy.market.title': 'Market Insights',

    // Real Estate
    'estate.hero.title': 'Global Premium Properties',
    'estate.hero.subtitle': 'Professional advisors helping you seize investment opportunities',
    'estate.filter.all': 'All',
    'estate.filter.available': 'Available',
    'estate.filter.sold': 'Sold',
    'estate.featured': 'Featured',
    'estate.sample.title': 'Sample Property',
    'estate.sample.location': 'Minato-ku, Tokyo',
    'estate.detail.price': 'Price',
    'estate.detail.location': 'Location',
    'estate.detail.features': 'Features',
    'estate.detail.layout': 'Floor Plan',
    'estate.detail.contact': 'Contact Us',
    'estate.detail.description': 'Description',
    'estate.detail.noDescription': 'No description available',
    'estate.detail.publishedAt': 'Published',

    // News
    'news.noContent': 'No content available',
    'news.gallery': 'Photo Gallery',
    'news.related': 'Related News',

    // Contact
    'contact.title': 'Contact Us',
    'contact.wechat': 'WeChat',
    'contact.line': 'Line',
    'contact.phone': 'Phone',
    'contact.scan': 'Scan QR Code',
    'contact.estateDesc': 'Scan QR code to contact us via WeChat or Line',
    'contact.interested': 'Interested in this property?',
    'contact.interestedDesc': 'Contact us for more information and professional consultation',

    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.back': 'Back',
    'common.close': 'Close',

    // Footer
    'footer.links': 'Links',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];
