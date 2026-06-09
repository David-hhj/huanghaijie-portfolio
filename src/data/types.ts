export type Highlight = {
  label: string;
  value: string;
  description?: string;
};

export type SkillGroup = {
  category: string;
  capabilities: {
    name: string;
    description: string;
    tools?: string[];
    output?: string;
  }[];
};

export type ExperienceItem = {
  period: string;
  title: string;
  organization?: string;
  owned: string;
  result?: string;
};

export type ProfileLinks = {
  email?: string;
  phone?: string;
  wechat?: string;
  blog?: string;
  helpCenter?: string;
  shopdora?: string;
  resume?: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  bio: string[];
  highlights: Highlight[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  links: ProfileLinks;
};

export type N8nWorkflow = {
  id: string;
  title: string;
  input: string;
  output: string;
  platform: "Ghost" | "WordPress";
  image: string;
  imageAlt: string;
};

export type AigcShowcaseItem = {
  id: string;
  output: string;
  canvas: string;
  poster: string;
  type: "image" | "video";
  caption: string;
  isPlaceholder?: boolean;
};

export type AIWorkflowItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  status: "coming_soon" | "active";
  isPlaceholder?: boolean;
};

export type NavItem = {
  label: string;
  labelEn: string;
  href: string;
  chapter?: string;
};
