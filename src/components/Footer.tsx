
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-bold text-2xl text-white">Brushin<span className="text-sky-400">.</span></span>
            </Link>
            <p className="text-slate-400 mb-6">
              Create professional LinkedIn content that drives engagement and builds your personal brand.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-sky-400 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-sky-400 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">About us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 mt-8 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Brushin. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span>Made with AI-powered technology</span>
            <ExternalLink size={14} className="ml-2" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
