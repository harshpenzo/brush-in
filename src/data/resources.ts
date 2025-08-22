export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'template' | 'tool' | 'checklist';
  downloadUrl?: string;
  readTime?: string;
  featured: boolean;
  tags: string[];
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "LinkedIn Content Calendar Template",
    description: "30-day content calendar with post ideas, optimal timing, and engagement strategies for consistent LinkedIn growth.",
    category: "Templates",
    type: "template",
    downloadUrl: "/resources/linkedin-content-calendar-template.pdf",
    readTime: "5 min setup",
    featured: true,
    tags: ["Content Planning", "LinkedIn", "Templates", "Social Media"]
  },
  {
    id: "2",
    title: "Viral LinkedIn Post Formulas",
    description: "Proven formulas and frameworks for creating LinkedIn posts that generate massive engagement and reach.",
    category: "Guides",
    type: "guide",
    readTime: "10 min read",
    featured: true,
    tags: ["Content Creation", "Viral Marketing", "LinkedIn", "Writing"]
  },
  {
    id: "3",
    title: "LinkedIn Profile Optimization Checklist",
    description: "Complete 50-point checklist to optimize your LinkedIn profile for maximum visibility and professional impact.",
    category: "Checklists",
    type: "checklist",
    downloadUrl: "/resources/linkedin-profile-checklist.pdf",
    readTime: "15 min",
    featured: true,
    tags: ["Profile Optimization", "LinkedIn", "Personal Branding", "Checklist"]
  },
  {
    id: "4",
    title: "LinkedIn Hashtag Research Tool Guide",
    description: "Step-by-step guide to finding and using the most effective hashtags for your LinkedIn content.",
    category: "Tools",
    type: "tool",
    readTime: "8 min read",
    featured: false,
    tags: ["Hashtags", "Research", "LinkedIn", "SEO"]
  },
  {
    id: "5",
    title: "B2B LinkedIn Lead Generation Playbook",
    description: "Complete playbook for generating qualified leads on LinkedIn with proven strategies and templates.",
    category: "Guides",
    type: "guide",
    downloadUrl: "/resources/b2b-linkedin-lead-generation.pdf",
    readTime: "25 min read",
    featured: true,
    tags: ["Lead Generation", "B2B", "LinkedIn", "Sales"]
  },
  {
    id: "6",
    title: "LinkedIn Video Content Templates",
    description: "Ready-to-use video content templates and scripts for creating engaging LinkedIn video posts.",
    category: "Templates",
    type: "template",
    downloadUrl: "/resources/linkedin-video-templates.pdf",
    readTime: "12 min setup",
    featured: false,
    tags: ["Video Content", "Templates", "LinkedIn", "Content Creation"]
  },
  {
    id: "7",
    title: "LinkedIn Analytics Tracking Sheet",
    description: "Comprehensive spreadsheet template for tracking your LinkedIn performance and measuring ROI.",
    category: "Templates",
    type: "template",
    downloadUrl: "/resources/linkedin-analytics-tracker.xlsx",
    readTime: "10 min setup",
    featured: false,
    tags: ["Analytics", "Tracking", "LinkedIn", "Performance"]
  },
  {
    id: "8",
    title: "Personal Branding Strategy Worksheet",
    description: "Interactive worksheet to define your personal brand, messaging, and content strategy on LinkedIn.",
    category: "Templates",
    type: "template",
    downloadUrl: "/resources/personal-branding-worksheet.pdf",
    readTime: "20 min",
    featured: true,
    tags: ["Personal Branding", "Strategy", "LinkedIn", "Worksheets"]
  },
  {
    id: "9",
    title: "LinkedIn Engagement Automation Guide",
    description: "Ethical automation strategies and tools to scale your LinkedIn engagement while maintaining authenticity.",
    category: "Guides",
    type: "guide",
    readTime: "15 min read",
    featured: false,
    tags: ["Automation", "Engagement", "LinkedIn", "Tools"]
  },
  {
    id: "10",
    title: "Industry-Specific LinkedIn Strategies",
    description: "Tailored LinkedIn strategies for different industries including Tech, Finance, Healthcare, and more.",
    category: "Guides",
    type: "guide",
    readTime: "30 min read",
    featured: true,
    tags: ["Industry Specific", "Strategy", "LinkedIn", "Vertical Marketing"]
  }
];

export const getFeaturedResources = (): Resource[] => {
  return resources.filter(resource => resource.featured);
};

export const getResourcesByCategory = (category: string): Resource[] => {
  return resources.filter(resource => resource.category === category);
};

export const getResourcesByType = (type: string): Resource[] => {
  return resources.filter(resource => resource.type === type);
};