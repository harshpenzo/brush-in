import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { MessageCircle, Search } from "lucide-react";
import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Brushin.in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brushin.in is an AI-powered LinkedIn content creation platform that helps professionals generate viral LinkedIn posts, optimize engagement, and build their personal brand."
        }
      },
      {
        "@type": "Question", 
        "name": "How much does Brushin.in cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brushin.in offers a free plan with 10 posts per month. Premium plans start at $29/month for unlimited posts and advanced features."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize the AI-generated posts?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Yes! All posts can be edited and customized to match your voice and style before publishing to LinkedIn."
        }
      }
    ]
  };
  
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first LinkedIn post?",
          answer: "To create your first LinkedIn post with BrushIn, navigate to the home page and click on 'Create Post'. Fill in details about your topic, preferred tone, and style, then click 'Generate Post with AI'. Your post will be created instantly and ready to copy to LinkedIn."
        },
        {
          question: "Is there a limit to how many posts I can create?",
          answer: "Free accounts can create up to 5 posts per month. For unlimited posts and advanced features, check out our Pro or Business plans on the Pricing page."
        },
        {
          question: "What makes BrushIn different from other LinkedIn post generators?",
          answer: "BrushIn is specifically optimized for professional LinkedIn content, with industry-specific templates, engagement optimization, and readability scoring. Our AI understands LinkedIn's algorithm to help your posts perform better."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I upgrade my account?",
          answer: "Visit our Pricing page and select the plan that best fits your needs. Click 'Get Started' and follow the prompts to complete your subscription process."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time from your account settings. Your benefits will continue until the end of your current billing period."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 7-day money-back guarantee on all new subscriptions. If you're not satisfied with our service, contact us within 7 days of your purchase for a full refund."
        }
      ]
    },
    {
      category: "Features & Usage",
      questions: [
        {
          question: "Can I schedule posts with BrushIn?",
          answer: "Yes, our Pro and Business plans include post scheduling functionality that allows you to plan your content calendar and schedule posts for the optimal time."
        },
        {
          question: "How do I optimize an existing post?",
          answer: "Click on the 'Optimize Post' tab, paste your existing LinkedIn post, select your optimization goal (engagement, clarity, or professionalism), and click 'Optimize Post with AI'."
        },
        {
          question: "Can I save my post drafts?",
          answer: "Pro and Business users can save unlimited drafts. Free users can access their most recent post until they create a new one."
        },
        {
          question: "What are hashtag recommendations?",
          answer: "BrushIn analyzes your post content and suggests relevant hashtags to increase your post's visibility on LinkedIn. These recommendations are based on trending topics and industry-specific hashtags."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFaqs = searchQuery === "" 
    ? faqCategories 
    : faqCategories.map(category => ({
        category: category.category,
        questions: category.questions.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  return (
    <>
      <SEOMetaTags 
        title="Frequently Asked Questions - LinkedIn AI Content Creator | Brushin.in"
        description="Get answers to common questions about Brushin.in LinkedIn content creator. Learn about pricing, features, customization, and how our AI helps create viral LinkedIn posts."
        keywords="LinkedIn content creator FAQ, AI writing tool questions, LinkedIn post generator help, content creation support, professional networking FAQ"
        url="https://brushin.in/faq"
        schemaMarkup={faqSchema}
      />
      <Layout>
        <div className="py-16 bg-white dark:bg-slate-900">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
                Help Center
              </span>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Get answers to the most common questions about using BrushIn for your LinkedIn content.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-500 dark:focus:border-brand-500"
                />
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-10">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem 
                        key={questionIndex} 
                        value={`${categoryIndex}-${questionIndex}`}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Try a different search term or browse our categories
                  </p>
                </div>
              )}
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <Card className="border border-slate-200 dark:border-slate-700 p-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Still have questions?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="flex items-center" asChild>
                    <a href="/contact">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact Support
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/pricing">
                      View Pricing Plans
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Faq;