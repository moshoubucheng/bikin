# 美錦エネルギー株式会社 官方网站

## 概览

公司名：**美錦エネルギー株式会社 / Bikin Energy Co.,Ltd.**  
两大业务：氢能源（为日本AI数据中心提供甲醇重整+PEMFC零碳电源）+ 日本不动产投资  
线上地址：`https://bikin.759nxrb6x4.workers.dev`  
部署平台：Cloudflare Workers  
CMS 后台：Keystatic（连接 GitHub 仓库 `moshoubucheng/bikin`，路径 `/admin`）

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Astro 5（SSR 模式） |
| UI 组件 | React 18（Islands 架构，按需激活） |
| 样式 | Tailwind CSS 3 |
| 内容管理 | Keystatic 0.5（文件系统 CMS） |
| 富文本 | Markdoc / MDX |
| 部署 | Cloudflare Workers（`@astrojs/cloudflare`） |
| 语言 | TypeScript |

---

## 目录结构

```
group-website/
├── src/
│   ├── pages/
│   │   ├── index.astro              # 根路径重定向到 /zh/
│   │   ├── 404.astro
│   │   ├── sitemap.xml.ts           # 自动生成 sitemap
│   │   └── [lang]/                  # 动态语言路由
│   │       ├── index.astro          # 首页
│   │       ├── energy/index.astro   # 氢能源页
│   │       ├── estate/
│   │       │   ├── index.astro      # 不动产列表页
│   │       │   └── [slug].astro     # 不动产详情页
│   │       ├── news/
│   │       │   ├── index.astro      # 新闻列表页
│   │       │   └── [slug].astro     # 新闻详情页
│   │       └── about/index.astro    # 关于我们页
│   ├── layouts/
│   │   └── BaseLayout.astro         # 全站公共布局（导航、页脚、SEO head）
│   ├── components/
│   │   ├── ContactModal.astro       # 联系方式弹窗（微信/Line二维码）
│   │   └── OptimizedImage.astro     # 图片优化组件
│   ├── content/                     # CMS 内容文件（由 Keystatic 管理）
│   │   ├── config.ts                # 所有 Collection 的 Schema 定义
│   │   ├── properties/              # 不动产房源
│   │   │   └── hotel-meijin/        # 每个房源一个文件夹
│   │   │       ├── index.mdoc       # 房源数据（frontmatter + 正文）
│   │   │       └── *.jpg            # 房源图片（存在房源文件夹内）
│   │   ├── news/                    # 新闻文章（结构同上）
│   │   ├── energy-gallery/          # 氢能图库
│   │   └── settings/
│   │       └── global.json          # 全局设置（联系方式、公司名、SEO）
│   ├── i18n/
│   │   ├── ui.ts                    # 所有 UI 文案的三语翻译字典
│   │   ├── utils.ts                 # 工具函数（getLangFromUrl 等）
│   │   └── index.ts                 # 统一导出
│   ├── assets/                      # 静态资源（Keystatic 上传目标）
│   │   ├── contact/                 # 微信/Line 二维码图片
│   │   ├── energy/                  # 氢能图库图片
│   │   ├── news/                    # 新闻图片
│   │   ├── properties/              # 不动产图片（备用路径）
│   │   └── uploads/                 # 通用上传
│   ├── styles/global.css            # 全局 CSS
│   └── utils/sanitize.ts            # HTML 净化工具
├── public/                          # 纯静态资源
│   ├── favicon.svg
│   ├── logo.svg
│   ├── logo-icon.svg
│   └── robots.txt
├── astro.config.mjs                 # Astro 配置（i18n、图片、构建）
├── keystatic.config.tsx             # CMS 后台字段定义
├── tailwind.config.mjs              # Tailwind 主题配置
├── wrangler.toml                    # Cloudflare Workers 部署配置
└── tsconfig.json
```

---

## 多语言系统

支持三种语言，**所有 URL 都带语言前缀**：

| 语言 | URL 前缀 | 例子 |
|------|---------|------|
| 简体中文（默认） | `/zh/` | `/zh/energy` |
| 日语 | `/ja/` | `/ja/energy` |
| 英语 | `/en/` | `/en/energy` |

根路径 `/` 自动重定向到 `/zh/`。语言回退规则：`ja` 和 `en` 缺字段时回退到 `zh`。

### 修改 UI 文案

所有界面文字集中在 `src/i18n/ui.ts`，按语言分三个对象（`zh` / `ja` / `en`）。  
修改某个文案只需找到对应的 key，同时更新三语版本。

```ts
// 示例：修改首页 hero 标题
'home.hero.title': '引领未来能源与生活方式',
```

---

## 内容管理（CMS）

### 访问后台

打开 `/admin` 路径即可访问 Keystatic 管理界面（需要 GitHub 授权）。  
后台连接 GitHub 仓库 `moshoubucheng/bikin`，所有改动通过 PR 合并后自动部署。

### 四类内容

#### 1. 不动产房源（`src/content/properties/`）

每个房源是一个独立文件夹，文件夹名即 URL slug：

```
src/content/properties/
└── hotel-meijin/
    ├── index.mdoc   ← 房源数据
    └── 1.jpg, 2.jpg ...  ← 图片与数据文件放在同一文件夹
```

**frontmatter 字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `{zh, ja, en}` | 三语标题（必填） |
| `description` | `{zh, ja, en}` | 三语描述（支持 HTML） |
| `price` | number | 价格（0 = 不展示价格） |
| `currency` | `CNY/JPY/USD` | 货币单位 |
| `location` | `{zh, ja, en}` | 三语地址 |
| `status` | `available/sold/reserved` | 状态（影响筛选标签） |
| `featured` | boolean | 是否首页推荐 |
| `images` | image[] | 图片列表（路径相对于 mdoc 文件） |
| `features` | `{zh,ja,en}[]` | 房源特色列表 |
| `layoutImage` | image | 户型图 |
| `area` | number | 面积（㎡） |
| `publishDate` | string | 发布日期 |

#### 2. 新闻动态（`src/content/news/`）

结构同不动产，文件夹名为 slug。

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `{zh, ja, en}` | 三语标题（必填） |
| `date` | string | 发布日期（必填） |
| `category` | `tech/market/company/estate` | 分类 |
| `coverImage` | image | 封面图 |
| `videoUrl` | string | 视频链接（YouTube 等） |
| `galleryImages` | image[] | 图片画廊 |
| `excerpt` | `{zh, ja, en}` | 三语摘要 |
| `featured` | boolean | 是否首页推荐 |
| `content` | mdx | 正文（Markdown） |

#### 3. 氢能图库（`src/content/energy-gallery/`）

用于氢能源页面的图片展示。

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `{zh, ja, en}` | 图片标题 |
| `image` | image | 图片（必填） |
| `category` | `station/exhibition/equipment/partners` | 分类 |
| `description` | `{zh, ja, en}` | 图片描述 |
| `order` | number | 排序（数字越小越靠前） |

#### 4. 全局设置（`src/content/settings/global.json`）

控制全站通用信息，直接编辑 JSON 或通过后台修改：

| 字段 | 说明 |
|------|------|
| `companyName` | 三语公司名（显示在导航、页脚） |
| `contact.phone` | 联系电话 |
| `contact.email` | 联系邮箱 |
| `contact.wechatQR` | 微信二维码图片路径 |
| `contact.wechatId` | 微信号 |
| `contact.lineQR` | Line 二维码图片路径 |
| `contact.lineId` | Line ID |
| `seo.defaultTitle` | 三语默认页面标题 |
| `seo.defaultDescription` | 三语默认 SEO 描述 |

---

## 页面说明

### 首页（`/[lang]/`）
展示两大业务入口（氢能源、不动产）+ 公司简介。文案全在 `ui.ts` 的 `home.*` 键。

### 氢能源页（`/[lang]/energy`）
静态页面，文案在 `ui.ts` 的 `energy.*` 键。包含：
- 痛点数据（电网等待期、DC电力需求增长、GX补贴规模）
- 三大核心解决方案
- 六大竞争优势
- 核心数据表格
- CTA 联系按钮

### 不动产页（`/[lang]/estate`）
从 `properties` collection 读取数据，支持按状态筛选（在售/已售）。  
详情页 `/[lang]/estate/[slug]` 展示图片画廊、特色列表、联系弹窗。

### 新闻页（`/[lang]/news`）
从 `news` collection 读取，支持按分类筛选。  
详情页展示封面图、正文、图片画廊。

### 关于我们（`/[lang]/about`）
公司概要（会社情報）+ 两大事业内容介绍。文案在 `ui.ts` 的 `about.*` 键。

---

## 布局与主题

所有页面使用 `BaseLayout.astro`，支持三种主题：

```astro
<BaseLayout theme="default">  <!-- 白底黑字 -->
<BaseLayout theme="energy">   <!-- 深蓝渐变，氢能源页用 -->
<BaseLayout theme="estate">   <!-- 深灰渐变，不动产页用 -->
```

BaseLayout 自动处理：导航栏（含移动端汉堡菜单）、页脚、SEO meta 标签、hreflang、Schema.org JSON-LD。

---

## 开发与部署

### 本地开发

```bash
npm run dev        # 启动开发服务器 http://localhost:4321
npm run build      # 类型检查 + 构建
npm run preview    # 预览构建产物
```

### 部署到 Cloudflare

```bash
npm run build
npx wrangler deploy
```

构建产物在 `dist/`，入口为 `dist/_worker.js`。  
Cloudflare Workers 名称：`bikin`（见 `wrangler.toml`）。

### 图片注意事项

- 不动产图片建议上传前压缩（Cloudflare Workers 有 25MB 上传限制）
- 图片通过 Astro `<Image>` 组件自动优化（使用 Sharp）
- `limitInputPixels: false` 已开启，支持处理超大图

---

## 常见更新任务

### 修改联系方式（微信号/电话/邮箱）
→ 编辑 `src/content/settings/global.json`，或通过 `/admin` 后台「全局设置」修改

### 更换微信/Line 二维码
→ 后台「全局设置」→ 上传新图片到 `wechatQR` / `lineQR` 字段

### 添加新不动产项目
1. 在 `src/content/properties/` 下新建文件夹（名称即 URL slug）
2. 在文件夹内创建 `index.mdoc`，填写 frontmatter
3. 将图片文件放入同一文件夹，在 `images` 字段用相对路径引用（如 `./1.jpg`）
4. 或直接在 `/admin` 后台操作

### 修改氢能源页面文案
→ 编辑 `src/i18n/ui.ts`，找到 `energy.*` 开头的 key，三语同步修改

### 修改关于我们/公司信息
→ 文案：`src/i18n/ui.ts` 中 `about.*` 键  
→ 公司名、联系方式：`src/content/settings/global.json`

### 添加新闻
→ `/admin` 后台「新闻动态」→ 新建条目，填写三语标题、正文、分类

---

## SEO 配置

- **hreflang**：BaseLayout 自动为三种语言输出 `<link rel="alternate">`
- **Schema.org**：BaseLayout 自动输出 Organization JSON-LD
- **sitemap**：`/sitemap.xml` 自动生成（`src/pages/sitemap.xml.ts`）
- **robots.txt**：`public/robots.txt`（已配置允许主流 AI 爬虫）
- **OG 标签**：每个页面可传 `title` / `description` / `image` 给 BaseLayout 覆盖默认值
