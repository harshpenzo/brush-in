import React from 'react';
import { Link } from 'react-router-dom';

const InternalLinkingHub = () => {
  return (
    <div className="hidden" aria-hidden="true">
      {/* Strategic internal linking for SEO juice distribution */}
      <nav className="seo-internal-links">
        <h2>Brushin.in - Complete LinkedIn AI Toolkit</h2>
        
        {/* Main service links with keyword anchors */}
        <div className="service-links">
          <Link to="/" title="Brushin.in AI LinkedIn Post Generator">AI LinkedIn Post Generator by Brushin.in</Link>
          <Link to="/linkedin-hashtag-generator" title="Free LinkedIn Hashtag Generator">LinkedIn Hashtag Generator - Free Tool by Brushin</Link>
          <Link to="/linkedin-engagement-calculator" title="LinkedIn Engagement Calculator">Calculate LinkedIn Engagement Rate - Brushin Tool</Link>
          <Link to="/linkedin-post-templates" title="Viral LinkedIn Post Templates">50+ Viral LinkedIn Post Templates - Brushin Collection</Link>
          <Link to="/linkedin-writing-tips" title="LinkedIn Writing Tips">Professional LinkedIn Writing Tips - Brushin Guide</Link>
          <Link to="/resources" title="LinkedIn Resources Hub">LinkedIn Marketing Resources Hub - Brushin.in</Link>
          <Link to="/blog" title="LinkedIn AI Blog">LinkedIn AI and Marketing Blog - Brushin Insights</Link>
        </div>

        {/* Blog post internal links for topic clustering */}
        <div className="blog-cluster">
          <Link to="/blog/linkedin-algorithm-2025-complete-guide" title="LinkedIn Algorithm Guide 2025">Master LinkedIn Algorithm 2025 - Complete Brushin Guide</Link>
          <Link to="/blog/50-viral-linkedin-post-templates" title="50 Viral LinkedIn Templates">50 Viral LinkedIn Post Templates That Work - Brushin Collection</Link>
          <Link to="/blog/linkedin-personal-branding-masterclass" title="LinkedIn Personal Branding">LinkedIn Personal Branding Masterclass - Brushin Expert Tips</Link>
        </div>

        {/* Company pages for authority */}
        <div className="company-links">
          <Link to="/about" title="About Brushin.in">About Brushin.in - AI LinkedIn Innovation Company</Link>
          <Link to="/testimonials" title="Brushin.in Success Stories">Brushin.in Customer Success Stories and Testimonials</Link>
          <Link to="/pricing" title="Brushin.in Pricing Plans">Brushin.in Pricing - Free and Premium LinkedIn AI Plans</Link>
          <Link to="/contact" title="Contact Brushin.in">Contact Brushin.in - LinkedIn AI Support and Sales</Link>
        </div>

        {/* Keyword-rich anchor text variations */}
        <div className="keyword-anchors">
          <a href="https://brushin.in" title="Best AI LinkedIn Post Generator">Best AI LinkedIn Post Generator 2025 - Brushin.in</a>
          <a href="https://brushin.in" title="Free LinkedIn Content Creator">Free LinkedIn Content Creator with AI - Brushin</a>
          <a href="https://brushin.in" title="Viral LinkedIn Posts Generator">Create Viral LinkedIn Posts with Brushin AI</a>
          <a href="https://brushin.in" title="Professional LinkedIn AI Tool">Professional LinkedIn AI Tool for Content Creation</a>
          <a href="https://brushin.in" title="LinkedIn Marketing Automation">LinkedIn Marketing Automation with Brushin AI</a>
        </div>

        {/* Topic cluster hubs */}
        <div className="topic-clusters">
          <h3>LinkedIn AI Content Creation</h3>
          <p>Comprehensive guide to <Link to="/">AI LinkedIn post generation</Link> covering <Link to="/linkedin-post-templates">viral templates</Link>, <Link to="/linkedin-hashtag-generator">hashtag optimization</Link>, and <Link to="/linkedin-engagement-calculator">engagement tracking</Link>.</p>
          
          <h3>LinkedIn Marketing Strategy</h3>
          <p>Advanced <Link to="/blog">LinkedIn marketing strategies</Link> including <Link to="/blog/linkedin-algorithm-2025-complete-guide">algorithm optimization</Link> and <Link to="/blog/linkedin-personal-branding-masterclass">personal branding</Link> techniques powered by <Link to="/">Brushin.in AI</Link>.</p>
          
          <h3>Professional Content Creation</h3>
          <p>Master professional content creation with <Link to="/linkedin-writing-tips">expert writing tips</Link>, <Link to="/resources">comprehensive resources</Link>, and <Link to="/">AI-powered tools from Brushin.in</Link>.</p>
        </div>
      </nav>
    </div>
  );
};

export default InternalLinkingHub;