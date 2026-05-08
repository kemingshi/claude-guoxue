# 执行步骤

## 阶段零：项目基础设施搭建 ✓

- [x] 创建 `devlog/` 文件夹
- [x] 创建 `docs/` 文件夹及四个标准文件
- [x] 创建 `CLAUDE.md` 项目指引

## 阶段一：基础骨架（唐诗 + 核心功能）✓

- [x] 准备诗歌数据（294 首唐诗）
- [x] 创建主页面（HTML + CSS + JS）
- [x] 随机展示、收藏、分享功能
- [x] 响应式布局

## 阶段二：扩充诗歌数据（294 首）✓

- [x] 诗歌数据扩充至 294 首
- [x] 覆盖 50+ 位唐代诗人

## 阶段三：UI 打磨（按钮布局优化）✓

- [x] 按钮布局调整

## 阶段四：架构改造（Preact + 多内容 + 搜索 + PWA）✓

### 步骤 1：准备数据文件 ✓
- [x] `data/poems.js` — 唐诗 294 首，添加 export、id、type 字段
- [x] `data/ci.js` — 宋词 50 首
- [x] `data/idioms.js` — 成语故事 30 条
- [x] `data/fables.js` — 寓言故事 20 条
- [x] `data/yijing.js` — 周易 64 卦
- [x] `data/laozi.js` — 老子 81 章
- [x] `data/zhuangzi.js` — 庄子经典篇章
- [x] `data/lunyu.js` — 论语精选语录
- [x] `config/categories.js` — 类型注册配置

### 步骤 2：创建 style.css ✓
- 侧边栏 + 内容区布局
- 响应式：移动端可滚动 Tab
- 搜索栏、搜索结果、内容类型适配
- PWA 安全区适配

### 步骤 3：创建 hooks ✓
- `hooks/useRandom.js` — 通用随机逻辑
- `hooks/useSearch.js` — 关键词搜索

### 步骤 4：创建子组件 ✓
- `app/Sidebar.js` — 类型导航
- `app/SearchBar.js` — 搜索栏
- `app/ContentCard.js` — 通用卡片
- `app/Actions.js` — 操作按钮
- `app/Toast.js` — 提示

### 步骤 5：创建 App.js 主组件 ✓
- 状态管理 + Service Worker 注册
- 组装所有子组件

### 步骤 6：创建 PWA 文件 ✓
- `manifest.json` — 应用清单
- `sw.js` — Service Worker
- `icons/icon-192.png` + `icons/icon-512.png`

### 步骤 7：更新 index.html ✓
- 精简为骨架，添加 PWA 支持

### 步骤 8：更新文档 ✓
- 更新 requirements.md、tech-spec.md、design-spec.md
- 更新 CLAUDE.md

### 步骤 9：测试验证
- [ ] 浏览器打开，确认八种内容类型正常显示
- [ ] 侧边栏切换功能正常
- [ ] 搜索功能正常
- [ ] 移动端布局正常
