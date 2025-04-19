import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageCircle, users } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Have questions about BrushIn or need assistance? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                We'd love to hear from you
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email Us</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-1">For general inquiries:</p>
                    <a href="mailto:info@brushin.com" className="text-brand-600 dark:text-brand-400 hover:underline">
                      info@brushin.com
                    </a>
                    <p className="text-slate-600 dark:text-slate-300 mt-2 mb-1">For support:</p>
                    <a href="mailto:support@brushin.com" className="text-brand-600 dark:text-brand-400 hover:underline">
                      support@brushin.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full mr-4">
                    <MessageCircle className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Live Chat</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Available Monday to Friday, 9am - 5pm EST. Click the chat bubble in the corner of your screen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full mr-4">
                    <users className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Schedule a Demo</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      See BrushIn in action with a personalized demo for your team.
                    </p>
                    <Button variant="outline" size="sm" className="text-brand-600 dark:text-brand-400 border-brand-600 dark:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20">
                      Book a Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={5}
                    className="border border-slate-300 dark:border-slate-600 rounded-lg"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Find quick answers to common questions.
            </p>
            <Button asChild>
              <a href="/faq" className="flex items-center">
                View All FAQs
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
