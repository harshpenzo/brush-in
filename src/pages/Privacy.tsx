import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";
import { Card } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Globe, UserCheck } from "lucide-react";

const Privacy = () => {
  const privacySchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Brushin.in",
    "description": "Privacy Policy for Brushin.in AI LinkedIn Post Generator. Learn how we collect, use, and protect your personal information.",
    "url": "https://brushin.in/privacy"
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Privacy Policy - Brushin.in | Data Protection & Privacy"
        description="Read our comprehensive Privacy Policy to understand how Brushin.in collects, uses, and protects your personal information. GDPR and CCPA compliant."
        keywords="privacy policy, data protection, GDPR compliance, CCPA compliance, personal data, Brushin.in privacy"
        url="https://brushin.in/privacy"
        schemaMarkup={privacySchemaMarkup}
      />
      
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-6">
              <Shield className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-sky-600" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This may include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and professional information</li>
                  <li>Content you create using our AI tools</li>
                  <li>Usage data and preferences</li>
                  <li>Communication history with our support team</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-sky-600" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Develop new products and services</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-sky-600" />
                Data Security
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>
                  Your data is encrypted in transit and at rest, and we regularly review our security 
                  practices to ensure they meet industry standards.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-sky-600" />
                Data Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-sky-600" />
                Your Rights and Choices
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at{" "}
                          <a href="mailto:work.harsh.batheja@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline">
          work.harsh.batheja@gmail.com
        </a>
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                GDPR and CCPA Compliance
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  <strong>GDPR (General Data Protection Regulation):</strong> We comply with EU data protection 
                  laws and provide appropriate safeguards for international data transfers.
                </p>
                <p>
                  <strong>CCPA (California Consumer Privacy Act):</strong> California residents have additional 
                  rights regarding their personal information, including the right to know what personal 
                  information is collected and the right to opt-out of the sale of personal information.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
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

export default Privacy;
