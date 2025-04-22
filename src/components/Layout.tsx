
import { ReactNode } from "react";
import Header from "./Header";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  onScrollToFeatures?: () => void;
}

const Layout = ({ children, onScrollToFeatures }: LayoutProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header onScrollToFeatures={onScrollToFeatures} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-slate-900 dark:bg-slate-950 py-16 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6 group">
                <div className="bg-brand-600 text-white p-2 rounded-lg transition-smooth group-hover:bg-brand-700">
                  <Linkedin size={24} />
                </div>
                <span className="font-semibold text-white text-2xl">
                  Brush<span className="text-brand-400 group-hover:text-brand-300 transition-smooth">In</span>
                </span>
              </div>
              <p className="text-slate-400 mb-6">
                Create engaging LinkedIn content that drives results for your professional network and establishes your personal brand.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-smooth">
                  <Mail size={18} />
                  <a href="mailto:contact@brushin.com" className="text-sm">contact@brushin.com</a>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-smooth">
                  <Phone size={18} />
                  <a href="tel:+11234567890" className="text-sm">+1 (123) 456-7890</a>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-smooth">
                  <MapPin size={18} />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-smooth"></span>
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 md:flex md:justify-between md:items-center text-center md:text-left">
            <div className="text-slate-500 text-sm mb-6 md:mb-0">
              © {currentYear} BrushIn. All rights reserved.
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-smooth hover:scale-110 transform" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-smooth hover:scale-110 transform" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-smooth hover:scale-110 transform" aria-label="GitHub">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
