export interface PostTemplate {
  id: string;
  title: string;
  category: string;
  template: string;
  description: string;
  tags: string[];
  useCase: string;
  example: string;
}

export const postTemplates: PostTemplate[] = [
  {
    id: "1",
    title: "The Failure Story",
    category: "Storytelling",
    template: `I failed spectacularly at [specific situation].

Here's what I learned:

→ [Lesson 1]
→ [Lesson 2] 
→ [Lesson 3]

The biggest takeaway? [Key insight]

What's the best failure lesson you've learned?`,
    description: "Share a professional failure and the valuable lessons learned from it.",
    tags: ["Storytelling", "Lessons Learned", "Authenticity"],
    useCase: "Building trust and showing vulnerability while providing value",
    example: `I failed spectacularly at my first product launch.

Here's what I learned:

→ Customer validation beats assumptions every time
→ MVP doesn't mean "barely functional"
→ Marketing starts before development, not after

The biggest takeaway? Listen to your users before building, not after launching.

What's the best failure lesson you've learned?`
  },
  {
    id: "2",
    title: "The Success Journey",
    category: "Storytelling",
    template: `5 years ago, I was [starting position].

Today, I'm [current position].

Here's what changed everything:

• [Strategy 1]
• [Strategy 2]
• [Strategy 3]

The most important factor? [Key success factor]

What's your biggest career transformation?`,
    description: "Showcase your professional growth and the strategies that led to success.",
    tags: ["Career Growth", "Success Story", "Inspiration"],
    useCase: "Establishing credibility and inspiring others with your journey",
    example: `5 years ago, I was a junior developer making $45k.

Today, I'm a Tech Lead at a unicorn startup making $180k.

Here's what changed everything:

• Building side projects to learn new technologies
• Contributing to open source projects
• Teaching others through blog posts and mentoring

The most important factor? Consistency over perfection.

What's your biggest career transformation?`
  },
  {
    id: "3",
    title: "The Controversial Opinion",
    category: "Thought Leadership",
    template: `Unpopular opinion: [Controversial statement]

Here's why I believe this:

1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

Am I wrong? What's your take?`,
    description: "Share a contrarian view to spark meaningful debate and engagement.",
    tags: ["Thought Leadership", "Debate", "Controversial"],
    useCase: "Positioning yourself as a thought leader and driving high engagement",
    example: `Unpopular opinion: Remote work is making us less creative.

Here's why I believe this:

1. Spontaneous conversations spark the best ideas
2. Reading body language is crucial for collaboration
3. Separate work/life spaces boost mental clarity

Am I wrong? What's your take?`
  },
  {
    id: "4",
    title: "The Numbered List",
    category: "Educational",
    template: `[Number] things I wish I knew when I started [profession/industry]:

1. [Insight 1]
2. [Insight 2]
3. [Insight 3]
4. [Insight 4]
5. [Insight 5]

Which one resonates most with you?`,
    description: "Share valuable insights in an easy-to-digest numbered format.",
    tags: ["Education", "Lists", "Career Advice"],
    useCase: "Providing value while establishing expertise in your field",
    example: `5 things I wish I knew when I started in marketing:

1. Data beats intuition every single time
2. A/B testing should be your default mode
3. Customer research is never optional
4. Brand awareness is hard to measure but crucial
5. Distribution is more important than creation

Which one resonates most with you?`
  },
  {
    id: "5",
    title: "The Process Reveal",
    category: "Behind the Scenes",
    template: `Here's exactly how I [achieved specific result]:

Step 1: [Action]
Step 2: [Action]
Step 3: [Action]
Step 4: [Action]

Result: [Specific outcome]

The key was [most important factor].

What's your process for [related activity]?`,
    description: "Break down your successful process into actionable steps.",
    tags: ["Process", "How-to", "Actionable"],
    useCase: "Providing tactical value while showcasing your expertise",
    example: `Here's exactly how I grew my newsletter from 0 to 10,000 subscribers:

Step 1: Created a compelling lead magnet (industry salary report)
Step 2: Optimized my LinkedIn profile to mention the newsletter
Step 3: Cross-promoted in 5 relevant communities
Step 4: Partnered with 3 other newsletter creators for swaps

Result: 10,000 engaged subscribers in 6 months

The key was focusing on value before asking for anything.

What's your process for growing an audience?`
  },
  {
    id: "6",
    title: "The Statistics Post",
    category: "Data-Driven",
    template: `I analyzed [number] [data points] and found:

📊 [Statistic 1]
📊 [Statistic 2]
📊 [Statistic 3]

The surprising insight? [Key finding]

Source: [Data source]

What do these numbers tell you?`,
    description: "Share compelling data and statistics to support your points.",
    tags: ["Data", "Research", "Insights"],
    useCase: "Building credibility through data and sparking analytical discussions",
    example: `I analyzed 1,000 viral LinkedIn posts and found:

📊 Posts with questions get 3x more comments
📊 Personal stories outperform generic advice by 400%
📊 Posts between 150-300 words perform best

The surprising insight? Vulnerability beats perfection every time.

Source: My analysis of top-performing posts in my network

What do these numbers tell you?`
  },
  {
    id: "7",
    title: "The Client Success Story",
    category: "Case Study",
    template: `A client came to me with [problem].

Their situation:
• [Challenge 1]
• [Challenge 2]
• [Challenge 3]

Our solution:
→ [Action 1]
→ [Action 2] 
→ [Action 3]

Results after [timeframe]:
• [Result 1]
• [Result 2]
• [Result 3]

The key insight? [Main lesson]

What's your biggest client challenge?`,
    description: "Showcase your results through a detailed client success story.",
    tags: ["Case Study", "Results", "Problem Solving"],
    useCase: "Demonstrating your value and attracting potential clients",
    example: `A client came to me with a 0.5% email open rate.

Their situation:
• Generic subject lines
• No segmentation strategy
• Sending to unengaged subscribers

Our solution:
→ Cleaned their list (removed 40% of subscribers)
→ Created 5 audience segments
→ A/B tested personalized subject lines

Results after 3 months:
• Open rate increased to 28%
• Click rate improved by 500%
• Revenue per email grew 10x

The key insight? Less can definitely be more.

What's your biggest email marketing challenge?`
  },
  {
    id: "8",
    title: "The Prediction Post",
    category: "Thought Leadership",
    template: `My [industry] predictions for [year]:

🔮 [Prediction 1]
🔮 [Prediction 2]
🔮 [Prediction 3]

The wildcard? [Unexpected prediction]

RemindMe in 12 months!

What's your boldest prediction?`,
    description: "Share your industry predictions to position yourself as a forward-thinking leader.",
    tags: ["Predictions", "Future Trends", "Industry Insights"],
    useCase: "Establishing thought leadership and creating bookmark-worthy content",
    example: `My tech predictions for 2025:

🔮 AI coding assistants will write 50% of all code
🔮 Remote work tools will become AR/VR native
🔮 No-code will power 80% of business applications

The wildcard? A major tech company will launch a fully decentralized social network.

RemindMe in 12 months!

What's your boldest tech prediction?`
  },
  {
    id: "9",
    title: "The Tool Recommendation",
    category: "Resources",
    template: `[Number] tools that transformed my [profession]:

1. [Tool] - [What it does/Why it's great]
2. [Tool] - [What it does/Why it's great]
3. [Tool] - [What it does/Why it's great]

Game-changer: [Most important tool]

What tools can't you live without?`,
    description: "Share your favorite professional tools and their impact.",
    tags: ["Tools", "Productivity", "Recommendations"],
    useCase: "Providing valuable resources while showcasing your tech-savviness",
    example: `5 tools that transformed my content creation:

1. Notion - Centralized content planning and idea management
2. Canva - Professional visuals without design skills
3. Grammarly - Error-free writing every time
4. Buffer - Consistent posting across platforms
5. Hotjar - Understanding how users interact with content

Game-changer: Notion - it replaced 6 different tools for me.

What tools can't you live without?`
  },
  {
    id: "10",
    title: "The Gratitude Post",
    category: "Networking",
    template: `Grateful for these [number] people who shaped my career:

1. [Person] - [How they helped]
2. [Person] - [How they helped]
3. [Person] - [How they helped]

Tag someone who's made a difference in your journey.`,
    description: "Show appreciation for mentors and colleagues who've helped you.",
    tags: ["Gratitude", "Networking", "Mentorship"],
    useCase: "Building relationships and encouraging others to share gratitude",
    example: `Grateful for these 3 people who shaped my entrepreneurial journey:

1. Sarah Chen - Taught me that customer feedback is gold, not criticism
2. Mike Rodriguez - Showed me how to build systems, not just products
3. Dr. Lisa Park - Reminded me that failure is data, not defeat

Tag someone who's made a difference in your journey.`
  }
];

export const getTemplatesByCategory = (category: string): PostTemplate[] => {
  return postTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string): PostTemplate | undefined => {
  return postTemplates.find(template => template.id === id);
};

export const getTemplateCategories = (): string[] => {
  return [...new Set(postTemplates.map(template => template.category))];
};