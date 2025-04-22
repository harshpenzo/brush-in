import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium mb-4">
              Flexible Pricing
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Choose the plan that best fits your professional content needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Enhanced pricing card styles */}
            <Card className="bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-400">
                  Starter
                </CardTitle>
                <p className="text-slate-400">Perfect for individuals</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-white">
                  $9 
                  <span className="text-lg text-slate-400">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>5 Posts per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Basic AI Content Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Community Support</span>
                  </li>
                </ul>
                <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>
            {/* Repeat for other pricing tiers with similar styling */}
            <Card className="bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-400">
                  Pro
                </CardTitle>
                <p className="text-slate-400">For growing professionals</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-white">
                  $29 
                  <span className="text-lg text-slate-400">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited Posts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Advanced AI Content Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-400">
                  Business
                </CardTitle>
                <p className="text-slate-400">For teams and agencies</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-white">
                  $99 
                  <span className="text-lg text-slate-400">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited Posts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Team Collaboration Features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Dedicated Account Manager</span>
                  </li>
                </ul>
                <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
