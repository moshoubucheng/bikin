# Energy 页面深度 Bug 检查报告

**检查时间**：2026-04-18
**检查范围**：
- `src/pages/[lang]/energy/index.astro`
- `src/i18n/ui.ts`（energy 相关键）
- `src/pages/[lang]/index.astro`（首页 energy 入口）
- JSON-LD Service + FAQPage schema

---

## 已修复的 Bug

### Bug 1：About 板块第 3 张卡片字号不一致
- **位置**：`src/pages/[lang]/energy/index.astro:561`
- **问题**：4 张数据卡片中，卡 1/2/4 使用 `text-2xl font-bold`，第 3 张（Air Liquide + WELLE）为了塞下英文长串用了 `text-sm font-bold`，视觉上明显偏小像是 bug
- **修复**：改为 `text-lg font-bold`，折中方案，英文串仍能完整显示，同时与其他卡片的字号落差缩小

### Bug 2：Roadmap 交替布局可能错位
- **位置**：`src/pages/[lang]/energy/index.astro:895`
- **问题**：奇数 phase 使用 `md:[&>*:first-child]:col-start-2` 把文字推到第 2 列。由于第 2 个子元素（圆点）没有显式定位，CSS Grid sparse 自动布局可能把圆点放到第 2 行第 1 列，导致文字与圆点不在同一行
- **修复**：容器追加 `md:grid-flow-dense`，强制 CSS Grid 回填空位，保证圆点回到第 1 行第 1 列

---

## 结构性检查（全部通过）

| 检查项 | 结果 |
|---|---|
| 3 语言 content 对象键对称 | ✅ 各 37 个键，完全一致 |
| `c.xxx` 模板引用 vs content 对象 | ✅ 无悬空引用，无孤儿键 |
| `t('energy.xxx')` 翻译存在性 | ✅ 全部在 `ui.ts` 三语段中定义 |
| 跨语言数组长度一致性 | ✅ sol1/2/3Points × 3、compareHeaders × 4、compareRows × 9、tableRows × 12、roadmapPhases × 5、faqs × 7 |
| 表格渲染 row 索引 vs 数据结构 | ✅ Compare 表 row[0..3]、Key Data 表 row[0..1] 均匹配 |
| JSON-LD Service schema | ✅ `@context`、`@type`、`areaServed`、`audience`、`additionalProperty` 结构完整 |
| JSON-LD FAQPage schema | ✅ `mainEntity` 正确映射 `c.faqs` |
| 首页 `home.energy.*` 键 | ✅ title/desc/cta 全部到位 |
| `npm run build` | ✅ 通过（仅剩与 energy 无关的 `hero-pattern.svg` 预存在警告） |
| `npx astro check` | ✅ 0 errors、0 warnings、4 hints（均为无关的 `is:inline` 提示） |

---

## 未验证项（需人工肉眼确认）

- 响应式断点在真实设备上的表现
- Compare 表格在 <720px 视窗下的横向滚动体验
- Roadmap 交替布局修复后的实际渲染效果
- 三语言下的文字换行 / 溢出情况
