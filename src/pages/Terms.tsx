import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";
import { Card } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Users } from "lucide-react";

const Terms = () => {
  const termsSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Brushin.in",
    "description": "Terms of Service for Brushin.in AI LinkedIn Post Generator. Read our terms and conditions for using our services.",
    "url": "https://brushin.in/terms"
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Terms of Service - Brushin.in | Legal Terms & Conditions"
        description="Read our Terms of Service to understand the legal terms and conditions for using Brushin.in AI LinkedIn Post Generator services."
        keywords="terms of service, terms and conditions, legal terms, Brushin.in terms, service agreement"
        url="https://brushin.in/terms"
        schemaMarkup={termsSchemaMarkup}
      />
      
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-6">
              <FileText className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-sky-600" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  By accessing and using Brushin.in ("Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your use of our website and services operated by Brushin.in.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-sky-600" />
                Description of Service
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Brushin.in provides an AI-powered LinkedIn post generation service that helps users create 
                  professional content for their LinkedIn profiles. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI-generated LinkedIn post content</li>
                  <li>Content optimization and suggestions</li>
                  <li>Hashtag recommendations</li>
                  <li>Content templates and tools</li>
                  <li>Analytics and performance insights</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-sky-600" />
                User Accounts and Responsibilities
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Ensuring your account information is up to date</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
                <p>
                  You must be at least 18 years old to use our service, or have parental consent if you are between 13-17 years old.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-sky-600" />
                Acceptable Use Policy
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Generate content that is illegal, harmful, threatening, or defamatory</li>
                  <li>Create content that infringes on intellectual property rights</li>
                  <li>Generate spam, misleading, or fraudulent content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper working of the Service</li>
                  <li>Use the Service for any commercial purpose without authorization</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-sky-600" />
                Intellectual Property Rights
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Our Rights:</strong> The Service and its original content, features, and functionality 
                  are owned by Brushin.in and are protected by international copyright, trademark, patent, 
                  trade secret, and other intellectual property laws.
                </p>
                <p>
                  <strong>Your Rights:</strong> Content you create using our AI tools belongs to you, subject 
                  to these Terms. You retain ownership of your original content and grant us a limited license 
                  to use it for service improvement purposes.
                </p>
                <p>
                  <strong>AI-Generated Content:</strong> AI-generated content is provided "as is" and may not 
                  be unique. We do not guarantee originality or claim ownership of AI-generated content.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Payment Terms and Subscription
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Free Tier:</strong> We offer a free tier with limited features. Free users can generate 
                  up to 10 posts per month.
                </p>
                <p>
                  <strong>Paid Plans:</strong> Premium features require a paid subscription. All fees are charged 
                  in advance on a monthly or annual basis.
                </p>
                <p>
                  <strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellation takes 
                  effect at the end of your current billing period.
                </p>
                <p>
                  <strong>Refunds:</strong> We offer a 7-day money-back guarantee for new subscriptions. 
                  Refund requests must be submitted within 7 days of purchase.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  In no event shall Brushin.in, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses, resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for any claims arising from the use of our Service shall not 
                  exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without 
                  prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                  limitation, including but not limited to a breach of the Terms.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Service or 
                  contact us to delete your account.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our sole discretion. By continuing 
                  to access or use our Service after any revisions become effective, you agree to be bound by 
                  the revised terms.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:legal@brushin.in" className="text-sky-600 dark:text-sky-400 hover:underline">legal@brushin.in</a></p>
                  <p><strong>Address:</strong> 125 Cyber Hub, Sector 24, Gurugram, Delhi NCR 122002, India</p>
                  <p><strong>Legal Department:</strong> <a href="mailto:legal@brushin.in" className="text-sky-600 dark:text-sky-400 hover:underline">legal@brushin.in</a></p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
