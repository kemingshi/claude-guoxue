# 技术规范

## 技术栈

- **Preact + HTM** via esm.sh CDN（轻量级组件框架，~3KB）
- **ES Modules** 所有文件使用 import/export
- **PWA** Service Worker 离线缓存
- **无构建工具**，浏览器直接打开即可运行

## 文件结构

```
tangshi300/
├── index.html              # 入口页面
├── style.css               # 全局样式
├── manifest.json           # PWA 应用清单
├── sw.js                   # Service Worker
├── app/                    # 组件
│   ├── App.js              # 主组件
│   ├── Sidebar.js          # 侧边栏
│   ├── SearchBar.js        # 搜索栏
│   ├── ContentCard.js      # 内容卡片
│   ├── Actions.js          # 操作按钮
│   └── Toast.js            # 提示
├── data/                   # 数据文件
│   ├── poems.js            # 唐诗 294 首
│   ├── ci.js               # 宋词 100 首
│   ├── idioms.js           # 成语故事 100 条
│   ├── fables.js           # 寓言故事 100 条
│   ├── yijing.js           # 周易 64 卦
│   ├── laozi.js            # 老子 81 章
│   ├── zhuangzi.js         # 庄子经典篇章
│   └── lunyu.js            # 论语精选语录
├── hooks/                  # 逻辑
│   ├── useRandom.js        # 随机选择
│   └── useSearch.js        # 搜索过滤
├── config/
│   └── categories.js       # 类型配置
├── icons/                  # PWA 图标
├── docs/                   # 项目文档
├── devlog/                 # 开发日志
└── CLAUDE.md               # 项目指引
```

## 数据格式

### 统一接口（每条内容必须有）

```js
{
  id: string,        // 唯一标识，如 "poem-001", "yijing-001"
  type: string,      // 类型标识
  title: string,     // 标题
}
```

### 各类型特有字段

**唐诗 poems / 宋词 ci**：`{ id, type, title, dynasty, author, paragraphs[] }`

**成语故事 idioms**：`{ id, type, title, explanation, story }`

**寓言故事 fables**：`{ id, type, title, story, moral }`

**周易 yijing**：`{ id, type, title, symbol, judgment, image, tuan, lines: [{ name, text, xiang }] }`

**老子 laozi**：`{ id, type, title, chapter, paragraphs[] }`

**庄子 zhuangzi**：`{ id, type, title, paragraphs[] }`

**论语 lunyu**：`{ id, type, title, book, paragraphs[] }`

## 编码约定

- 所有 JS 文件使用 ES Modules（import/export）
- 组件使用 Preact + HTM tagged template literals
- CSS 使用 CSS 变量定义主题色，class 命名使用 kebab-case
- 变量命名使用 camelCase
- 缩进：2 空格

## 组件架构

- **App.js** — 主组件，管理状态（activeCategory, viewMode, currentIndexes, searchQuery, searchResults, viewingItem, toastState），注册 Service Worker
- **Sidebar.js** — 类型导航，渲染分类按钮
- **SearchBar.js** — 输入框 + 搜索按钮，Enter 键支持
- **ContentCard.js** — 通用卡片，按 type 适配渲染布局
- **Actions.js** — 操作按钮（换一首、分享）
- **Toast.js** — 底部提示，2 秒自动消失

## 视图模式

| viewMode | 说明 | 显示内容 |
|----------|------|---------|
| "random" | 默认模式 | 当前类型随机一条 + 操作按钮 |
| "search" | 搜索结果模式 | 搜索结果列表 + 点击查看详情 |

## Service Worker 缓存策略

- **预缓存**：所有本地文件（HTML, CSS, JS, 数据文件）
- **运行时缓存**：esm.sh CDN 资源，cache-first 策略
- **缓存版本**：`guoxue-v1`

## PWA 部署要求

- HTTPS（localhost 除外）
- 推荐：GitHub Pages 或 Vercel
