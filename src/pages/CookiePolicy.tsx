import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";
import { Card } from "@/components/ui/card";
import { Cookie, Shield, Settings, Eye, Database, Globe } from "lucide-react";

const CookiePolicy = () => {
  const cookieSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Brushin.in",
    "description": "Cookie Policy for Brushin.in AI LinkedIn Post Generator. Learn how we use cookies and similar technologies.",
    "url": "https://brushin.in/cookie-policy"
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Cookie Policy - Brushin.in | How We Use Cookies"
        description="Read our Cookie Policy to understand how Brushin.in uses cookies and similar technologies to improve your experience."
        keywords="cookie policy, cookies, data collection, tracking, Brushin.in cookies, privacy"
        url="https://brushin.in/cookie-policy"
        schemaMarkup={cookieSchemaMarkup}
      />
      
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-6">
              <Cookie className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-sky-600" />
                What Are Cookies?
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our site, and personalizing content.
                </p>
                <p>
                  We use both session cookies (which expire when you close your browser) and persistent 
                  cookies (which remain on your device for a set period).
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-sky-600" />
                How We Use Cookies
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics Cookies:</strong> Provide insights into website usage</li>
                  <li><strong>Marketing Cookies:</strong> Deliver relevant content and advertisements</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-sky-600" />
                Types of Cookies We Use
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Essential Cookies</h3>
                    <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Analytics Cookies</h3>
                    <p>We use Google Analytics to understand how visitors interact with our website, helping us improve user experience.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Functional Cookies</h3>
                    <p>These cookies remember your preferences and settings to provide a personalized experience.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Marketing Cookies</h3>
                    <p>Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-sky-600" />
                Third-Party Cookies
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Some cookies are placed by third-party services that appear on our pages. These include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                  <li><strong>Google Ads:</strong> Advertising and conversion tracking</li>
                  <li><strong>Social Media:</strong> LinkedIn, Twitter, and Facebook integration</li>
                  <li><strong>Payment Processors:</strong> Secure payment processing</li>
                </ul>
                <p>
                  We do not control these third-party cookies. Please refer to their respective privacy policies 
                  for more information about how they use your data.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-sky-600" />
                Managing Your Cookie Preferences
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through settings</li>
                  <li><strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
                  <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                  <li><strong>Contact Us:</strong> Reach out to us for assistance with cookie management</li>
                </ul>
                <p>
                  <strong>Note:</strong> Disabling certain cookies may affect website functionality and user experience.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-sky-600" />
                International Data Transfers
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Some of our third-party cookie providers may transfer data outside your country of residence. 
                  We ensure that such transfers comply with applicable data protection laws and provide 
                  appropriate safeguards for your personal information.
                </p>
                <p>
                  For users in the European Economic Area (EEA), we ensure that international transfers 
                  comply with GDPR requirements and provide adequate protection for your data.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Updates to This Policy
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons.
                </p>
                <p>
                  We will notify you of any material changes by posting the updated policy on our website 
                  and updating the "Last updated" date above.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  If you have any questions about our use of cookies or this Cookie Policy, 
                  please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:work.harsh.batheja@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline">work.harsh.batheja@gmail.com</a></p>
                                      <p><strong>Address:</strong> Delhi NCR, Ghaziabad, Christ University, India</p>
                  <p><strong>Data Protection Officer:</strong> <a href="mailto:work.harsh.batheja@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline">work.harsh.batheja@gmail.com</a></p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
