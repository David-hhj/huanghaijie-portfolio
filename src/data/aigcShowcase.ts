import type { AigcShowcaseItem } from "./types";

export const aigcShowcase: AigcShowcaseItem[] = [
  {
    id: "fpv-aerial",
    output: "/videos/aigc/fpv.mp4",
    canvas: "/images/aigc/canvas-fpv.png",
    poster: "/images/aigc/posters/fpv.jpg",
    type: "video",
    caption: "FPV 航拍视频 — 上传城市鸟瞰图，自动生成 FPV 航拍视频",
  },
  {
    id: "cooking-animation",
    output: "/videos/aigc/cooking.mp4",
    canvas: "/images/aigc/canvas-cooking.png",
    poster: "/images/aigc/posters/cooking.jpg",
    type: "video",
    caption: "料理动画视频 — 输入菜名，自动生成 AI 料理动画视频",
  },
  {
    id: "cat-vlog",
    output: "/videos/aigc/cat-vlog.mp4",
    canvas: "/images/aigc/canvas-cat-vlog.png",
    poster: "/images/aigc/posters/cat-vlog.jpg",
    type: "video",
    caption: "猫咪上班 Vlog — 上传猫咪参考图与名称，自动生成脚本与视频片段",
  },
  {
    id: "shaw-english",
    output: "/videos/aigc/shaw-english.mp4",
    canvas: "/images/aigc/canvas-shaw-english.png",
    poster: "/images/aigc/posters/shaw-english.jpg",
    type: "video",
    caption: "邵氏武侠风英语教学 — 输入英文单词或短语，自动生成趣味教学视频",
  },
  {
    id: "ecommerce",
    output: "/videos/aigc/ecommerce.mp4",
    canvas: "/images/aigc/canvas-ecommerce.png",
    poster: "/images/aigc/posters/ecommerce.jpg",
    type: "video",
    caption: "高级感电商视频 — 上传产品图与介绍，自动生成高级感电商视频",
  },
];
