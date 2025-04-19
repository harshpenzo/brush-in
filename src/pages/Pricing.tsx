import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Layout from "@/components/Layout";

const Pricing = () => {
  return (
    <Layout>
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
              Pricing Plans
            </span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Choose the Perfect Plan for Your LinkedIn Content
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Whether you're just getting started or scaling your professional presence, 
              we have a plan that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">5 AI-generated posts per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Basic post optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Standard post templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Community support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-brand-500 dark:border-brand-400 shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute top-0 right-0 bg-brand-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-md">
                Popular
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <CardDescription>For growing professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$19</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">30 AI-generated posts per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Advanced post optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Premium post templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Post scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Save post history</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Business Plan */}
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Business</CardTitle>
                <CardDescription>For teams and power users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$49</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Unlimited AI-generated posts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Premium post optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">All post templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Advanced scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">Analytics dashboard</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions About Our Plans
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Have questions about our pricing? Check out our <a href="/faq" className="text-brand-600 dark:text-brand-400 hover:underline">FAQ page</a> or <a href="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
