
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-6 sm:mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <span className="font-bold text-xl sm:text-2xl text-white">Brushin<span className="text-sky-400">.</span></span>
            </Link>
            <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Create professional LinkedIn content that drives engagement and builds your personal brand.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors p-2 touch-target">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors p-2 touch-target">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors p-2 touch-target">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors p-2 touch-target">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Product</h3>
            <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
              <li>
                <Link to="/pricing" className="hover:text-sky-400 transition-colors py-1 block touch-target">Pricing</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-sky-400 transition-colors py-1 block touch-target">Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-sky-400 transition-colors py-1 block touch-target">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors py-1 block touch-target">About us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors py-1 block touch-target">Contact</Link>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors py-1 block touch-target">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Legal</h3>
            <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors py-1 block touch-target">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors py-1 block touch-target">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors py-1 block touch-target">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 sm:pt-8 mt-6 sm:mt-8 text-slate-500 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p>&copy; {currentYear} Brushin. All rights reserved.</p>
          <div className="flex items-center">
            <span>Made with AI-powered technology</span>
            <ExternalLink size={12} className="ml-2 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
