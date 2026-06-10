import type { N8nWorkflow } from "./types";

export const shopdoraCase = {
  client: "Shopdora",
  site: "https://www.shopdora.com",
  seo: {
    title: "Shopdora SEO 增长",
    summary:
      "为 Shopee 选品数据工具 Shopdora 实现海内外自然搜索流量持续增长，支撑海外营收提升。",
    role: "关键词策略、技术 SEO 方案、内容矩阵规划、数据监控与复盘",
    image: "/images/seo/seo-results.webp",
    imageAlt: "Shopdora SEO 成果数据截图",
    metrics: [
      { value: "+500%", label: "自然流量 · 6 个月" },
      { value: "15+", label: "关键词 Google 首页" },
      { value: "+50%", label: "海外营收增长" },
    ],
    links: [
      { label: "Ghost 博客", href: "https://blog.shopdora.com/en" },
      { label: "WordPress 帮助中心", href: "https://help.shopdora.com/en" },
    ],
  },
  automation: {
    title: "博客自动化管线",
    subtitle: "n8n × Ghost × WordPress",
    description:
      "为 blog.shopdora.com 与 help.shopdora.com 搭建 4 条生产级内容自动化管线，覆盖关键词驱动生成、信息爬取、文件检测与多语言翻译发布。",
    platforms: {
      ghost: "https://blog.shopdora.com/en",
      wordpress: "https://help.shopdora.com/en",
    },
  },
};

export const n8nWorkflows: N8nWorkflow[] = [
  {
    id: "keyword-blog",
    title: "关键词勾选 → Ghost 图文",
    input: "关键词勾选与选题输入",
    output: "Ghost 博客图文文章自动发布",
    platform: "Ghost",
    image: "/images/projects/n8n/keyword-blog-ghost.webp",
    imageAlt: "n8n 工作流：关键词勾选自动生成 Ghost 博客图文",
  },
  {
    id: "cross-border-daily",
    title: "跨境信息爬取 → 多语言日报",
    input: "定时爬取跨境信息源",
    output: "多语言日报博客发布至 Ghost",
    platform: "Ghost",
    image: "/images/projects/n8n/cross-border-daily-ghost.webp",
    imageAlt: "n8n 工作流：定时爬取跨境信息源生成多语言日报",
  },
  {
    id: "file-weekly",
    title: "文件检测 → 多语言周报",
    input: "自动检测上传文件并提取内容",
    output: "多语言周报博客发布至 Ghost",
    platform: "Ghost",
    image: "/images/projects/n8n/file-extract-weekly-ghost.webp",
    imageAlt: "n8n 工作流：文件检测提取内容生成多语言周报",
  },
  {
    id: "translate-wp",
    title: "博客翻译 → WordPress 多语言发布",
    input: "已上传的博客文章",
    output: "翻译后发布至 WordPress 新语言板块",
    platform: "WordPress",
    image: "/images/projects/n8n/translate-wordpress.webp",
    imageAlt: "n8n 工作流：自动翻译博客并发布到 WordPress",
  },
];
