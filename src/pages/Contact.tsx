
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 relative">
              Contact Us
              <span className="absolute -top-6 -right-6 text-5xl text-sky-300/20 animate-pulse">✉️</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Have questions about our services or need help with your LinkedIn content strategy?
              Our team in Delhi NCR, Ghaziabad (Christ University) is here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Send us a message
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="w-full hover:border-sky-400 focus:border-sky-500 transition-colors duration-300 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="w-full hover:border-sky-400 focus:border-sky-500 transition-colors duration-300 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full hover:border-sky-400 focus:border-sky-500 transition-colors duration-300 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="w-full hover:border-sky-400 focus:border-sky-500 transition-colors duration-300 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="w-full min-h-[150px] hover:border-sky-400 focus:border-sky-500 transition-colors duration-300 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white group overflow-hidden relative">
                    <span className="relative z-10 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-white/20 scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-300"></span>
                  </Button>
                </form>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-full animate-pulse">
                    <MessageCircle className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Customer Support
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      Our support team is available Monday through Friday, 10am to 7pm IST.
                    </p>
                    <a href="mailto:work.harsh.batheja@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1 hover:gap-2 transition-all duration-300">
                      work.harsh.batheja@gmail.com
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-full animate-pulse">
                    <Mail className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Business Inquiries
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      For partnerships, press, or business development opportunities.
                    </p>
                    <a href="mailto:work.harsh.batheja@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1 hover:gap-2 transition-all duration-300">
                      work.harsh.batheja@gmail.com
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-full animate-pulse">
                    <MapPin className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Office Location
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      125 Cyber Hub<br />
                      Sector 24<br />
                      Delhi NCR, Ghaziabad, Christ University
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none z-10"></div>
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754528188!3d28.52758200617608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sChrist%20University%2C%20Ghaziabad!5e0!3m2!1sen!2sin!4v1714296204875!5m2!1sen!2sin"
                  className="w-full h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
