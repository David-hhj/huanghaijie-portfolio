import type { NavItem, Profile } from "./types";

export const profile: Profile = {
  name: "黄海杰",
  title: "全能运营 · SEO 优化 · 数据增长",
  tagline:
    "将 SEO、自动化、AIGC 与数据复盘结合，把内容生产从「手工」升级为「系统」。",
  location: "深圳",
  availability: "开放 SEO、内容运营、增长与 AI 应用相关机会",
  bio: [
    "网络与新媒体专业背景，专注搜索增长与 AI 赋能内容生产。",
    "目前在 Shopdora（虾多拉）负责海内外推广与 SEO，主导关键词策略、技术 SEO 方案与多语言内容矩阵。",
    "曾在腾讯微保担任企业文化实习生，负责团庆传播策划、企业学习平台标签体系搭建与活动视频制作；在网易互娱独立完成官方账号视频全流程制作。",
    "擅长通过 GSC、GA4、Semrush 及社媒后台数据进行策略迭代；熟练使用 n8n、AI Agent 提升内容产出效率。",
  ],
  highlights: [
    {
      value: "+500%",
      label: "自然搜索流量增长",
      description: "Shopdora · 6 个月内",
    },
    {
      value: "15+",
      label: "关键词 Google 首页",
      description: "核心词排名进入首页",
    },
    {
      value: "4 条",
      label: "n8n 博客自动化",
      description: "Ghost + WordPress 多语言内容管线",
    },
    {
      value: "+2k",
      label: "抖音涨粉",
      description: "仙女龙 AI · 2 个月内容运营成果",
    },
  ],
  skills: [
    {
      category: "搜索与增长",
      capabilities: [
        {
          name: "关键词研究与布局",
          description: "建立核心词库与关键词矩阵，嵌入产品页、落地页及博客内容。",
          tools: ["Ahrefs", "Semrush", "SimilarWeb"],
          output: "200+ 关键词词库",
        },
        {
          name: "技术 SEO 与页面优化",
          description: "页面结构、Meta 标签、内链架构与移动端适配诊断与优化方案。",
          tools: ["GSC", "GA4"],
          output: "可执行的 SEO 优化方案",
        },
        {
          name: "外链建设与多语言内容",
          description: "竞品外链分析、Guest Post 与多语言博客内容策划执行。",
          tools: ["Semrush", "Ghost", "WordPress"],
          output: "200+ 优质外链",
        },
      ],
    },
    {
      category: "自动化与 AI",
      capabilities: [
        {
          name: "n8n 工作流搭建",
          description: "为博客与帮助中心搭建从采集、生成到发布的自动化内容管线。",
          tools: ["n8n", "Ghost API", "WordPress"],
          output: "4 条生产级自动化流程",
        },
        {
          name: "AI 辅助内容生产",
          description: "结合 LLM 辅助写作与审核，在保证质量的前提下提升产出效率。",
          tools: ["Claude", "GPT", "Cursor"],
          output: "内容生产效率提升约 3 倍",
        },
        {
          name: "Agent 协作工作流",
          description: "使用 AI Agent 辅助 SEO 分析、内容策划与日常工作效率提升。",
          tools: ["Cursor Agent", "Claude Code"],
          output: "可复用的 AI 工作流",
        },
      ],
    },
    {
      category: "内容与媒体",
      capabilities: [
        {
          name: "短视频与图文制作",
          description: "独立完成脚本、拍摄、剪辑与图文内容发布全流程。",
          tools: ["剪映", "Pr", "Ps"],
          output: "网易互娱周均 3-4 支视频，均播 10w+",
        },
        {
          name: "社媒账号运营",
          description: "负责内容制作、发布节奏与数据复盘，持续优化内容策略。",
          tools: ["抖音", "小红书", "公众号"],
          output: "仙女龙 AI 2 个月涨粉 2k",
        },
        {
          name: "AIGC 画布生产",
          description: "搭建 AIGC 生产画布，实现内容极速化与模板化产出。",
          tools: ["AIGC 产品"],
          output: "模板化批量内容生产",
        },
      ],
    },
  ],
  experience: [
    {
      period: "2026.04 – 至今",
      title: "AIGC 社媒运营",
      organization: "仙女龙 AI · 抖音",
      owned: "负责 AIGC 产品内容制作、发布与账号运营，搭建 AIGC 生产画布实现模板化产出。",
      result: "2 个月涨粉 2,000+",
    },
    {
      period: "2025.07 – 至今",
      title: "产品推广",
      organization: "深圳市虾多拉信息技术有限公司（Shopdora）",
      owned: "负责 Shopdora 海内外推广与 SEO：关键词策略、技术 SEO、内容矩阵、外链建设与数据复盘。",
      result: "自然流量 +500%，15+ 关键词首页，海外营收 +50%",
    },
    {
      period: "2025.04 – 2025.07",
      title: "编导 / 运营",
      organization: "餐饮 IP 打造项目",
      owned: "负责厨师 IP 视频脚本、拍摄剪辑、图文发布与平台数据优化。",
      result: "通过搜索热词与发布策略优化实现持续涨粉",
    },
    {
      period: "2024.08 – 2024.11",
      title: "企业文化实习",
      organization: "腾讯微保",
      owned: "团庆内容传播策划、企业微信学习平台标签体系搭建、活动视频制作。",
      result: "优化推送策略提升活动参与率，改善课程检索效率",
    },
    {
      period: "2024.03 – 2024.05",
      title: "视频编辑实习",
      organization: "网易互娱",
      owned: "独立完成《决战平安京》官方账号视频全流程制作。",
      result: "周均 3-4 支视频，均播 10w+，完播率提升 30%",
    },
  ],
  links: {
    email: "2824739581@qq.com",
    phone: "14774957435",
    wechat: "JG_666xx",
    shopdora: "https://www.shopdora.com",
    blog: "https://blog.shopdora.com/en",
    helpCenter: "https://help.shopdora.com/en",
    resume: "/resume/huanghaijie-seo.pdf",
  },
};

export const navItems: NavItem[] = [
  { label: "经历", labelEn: "ABOUT", href: "#about", chapter: "01" },
  { label: "SEO优化", labelEn: "WORK", href: "#shopdora", chapter: "02" },
  { label: "内容增长", labelEn: "CONTENT", href: "#content", chapter: "03" },
  { label: "数据", labelEn: "DATA", href: "#data", chapter: "04" },
  { label: "AI Lab", labelEn: "LAB", href: "#ai-lab", chapter: "05" },
  { label: "优势", labelEn: "SKILLS", href: "#strengths", chapter: "06" },
  { label: "联系", labelEn: "CONTACT", href: "#contact", chapter: "07" },
];
