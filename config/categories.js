import { yijing } from '../data/yijing.js';
import { laozi } from '../data/laozi.js';
import { zhuangzi } from '../data/zhuangzi.js';
import { lunyu } from '../data/lunyu.js';
import { poems } from '../data/poems.js';
import { ci } from '../data/ci.js';
import { idioms } from '../data/idioms.js';
import { fables } from '../data/fables.js';

export var categories = [
  { key: "yijing", label: "周易", icon: "☯️", data: yijing },
  { key: "laozi", label: "老子", icon: "🌿", data: laozi },
  { key: "zhuangzi", label: "庄子", icon: "🦋", data: zhuangzi },
  { key: "lunyu", label: "论语", icon: "📚", data: lunyu },
  { key: "poem", label: "唐诗", icon: "📜", data: poems },
  { key: "ci", label: "宋词", icon: "🎵", data: ci },
  { key: "idiom", label: "成语故事", icon: "📖", data: idioms },
  { key: "fable", label: "寓言故事", icon: "🦊", data: fables }
];
