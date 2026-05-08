# 国学经典 项目指引

## 项目概述

国学经典随机展示网站 —— 一个轻量级 PWA 应用，支持周易、老子、庄子、论语、唐诗、宋词、成语故事、寓言故事八种内容的随机浏览和搜索。Preact + HTM 实现，可添加到手机主屏幕离线使用。

## 标准文件路径

| 文件 | 路径 | 用途 |
| --- | --- | --- |
| 开发需求 | `docs/requirements.md` | 功能列表、用户故事、验收标准 |
| 技术规范 | `docs/tech-spec.md` | 技术栈、文件结构、数据格式、编码约定 |
| 设计规范 | `docs/design-spec.md` | 色彩、字体、布局、组件样式、响应式 |
| 执行步骤 | `docs/execution-plan.md` | 阶段划分、每阶段产出与验证 |
| 开发日志 | `devlog/YYYY-MM-DD.md` | 按日期记录开发事项和待办 |

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
│   ├── ci.js               # 宋词 50 首
│   ├── idioms.js           # 成语故事 30 条
│   ├── fables.js           # 寓言故事 20 条
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
└── CLAUDE.md               # 本文件
```

## 技术栈

- **Preact + HTM** via esm.sh CDN
- **ES Modules** 所有文件使用 import/export
- **PWA** Service Worker 离线缓存
- 无构建工具，浏览器直接打开即可运行

## 工作说明

1. **开发前**：阅读 `docs/` 下的相关标准文件
2. **开发中**：遵循技术规范中的编码约定
3. **开发后**：在 `devlog/` 中记录当日开发事项
4. **阶段切换**：需用户确认后再进入下一阶段

## 当前进度

- 阶段零：项目基础设施搭建 ✓
- 阶段一：基础骨架（唐诗 + 核心功能）✓
- 阶段二：扩充诗歌数据（294 首）✓
- 阶段三：UI 打磨（按钮布局优化）✓
- 阶段四：架构改造（Preact + 多内容 + 搜索 + PWA）✓
