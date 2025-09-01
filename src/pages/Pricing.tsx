import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white">
        <div className="container px-4 mx-auto">
          {/* Free Banner */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-6 py-3 rounded-full font-bold animate-pulse">
                🎉 LIMITED TIME: 100% FREE ACCESS
              </Badge>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 mb-8 backdrop-blur-sm">
              <h1 className="text-5xl font-bold text-white mb-4">
                <span className="text-green-400">Everything FREE</span> During Beta
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-6">
                Get unlimited access to all premium features while we're in beta. No credit card required, no hidden fees!
              </p>
              <div className="flex items-center justify-center gap-4 text-green-400 font-semibold">
                <span className="flex items-center gap-2">✅ Unlimited Posts</span>
                <span className="flex items-center gap-2">✅ All AI Features</span>
                <span className="flex items-center gap-2">✅ Premium Support</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-slate-700/50 text-slate-400 rounded-full text-sm font-medium mb-4">
              Future Pricing (When We Exit Beta)
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              What These Plans Will Cost Later
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Enjoy everything for free now, see what you'll save!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan - Now FREE */}
            <Card className="relative bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-green-500 text-white font-bold">FREE NOW!</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-sky-400">
                  Starter
                </CardTitle>
                <p className="text-slate-400">Perfect for individuals</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl text-slate-500 line-through mb-2">
                    $9<span className="text-lg">/month</span>
                  </div>
                  <div className="text-4xl font-bold text-green-400">
                    FREE
                  </div>
                  <p className="text-sm text-green-400 mt-1">During Beta</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><s className="text-slate-500">5 Posts per month</s> → <strong className="text-green-400">UNLIMITED</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Advanced AI Content Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Premium Support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                  onClick={() => navigate("/auth")}
                >
                  Start Free Now
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan - Now FREE with POPULAR badge */}
            <Card className="relative bg-slate-800 border-green-500 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold animate-pulse">MOST POPULAR</Badge>
              </div>
              <div className="absolute -top-3 -left-3">
                <Badge className="bg-green-500 text-white font-bold">FREE NOW!</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-sky-400">
                  Pro
                </CardTitle>
                <p className="text-slate-400">For growing professionals</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl text-slate-500 line-through mb-2">
                    $29<span className="text-lg">/month</span>
                  </div>
                  <div className="text-4xl font-bold text-green-400">
                    FREE
                  </div>
                  <p className="text-sm text-green-400 mt-1">During Beta</p>
                  <p className="text-xs text-slate-400 mt-1">Save $348/year!</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Unlimited Posts</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Advanced AI Content Generation</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Priority Support</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Analytics Dashboard</strong></span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold"
                  onClick={() => navigate("/auth")}
                >
                  Start Free Now
                </Button>
              </CardContent>
            </Card>

            {/* Business Plan - Now FREE */}
            <Card className="relative bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-green-500 text-white font-bold">FREE NOW!</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-sky-400">
                  Business
                </CardTitle>
                <p className="text-slate-400">For teams and agencies</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl text-slate-500 line-through mb-2">
                    $99<span className="text-lg">/month</span>
                  </div>
                  <div className="text-4xl font-bold text-green-400">
                    FREE
                  </div>
                  <p className="text-sm text-green-400 mt-1">During Beta</p>
                  <p className="text-xs text-slate-400 mt-1">Save $1,188/year!</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Unlimited Posts</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Team Collaboration Features</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">Dedicated Account Manager</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong className="text-green-400">White Label Solution</strong></span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                  onClick={() => navigate("/auth")}
                >
                  Start Free Now
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Free Benefits Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600">
              <h3 className="text-2xl font-bold text-white mb-4">Why Everything is FREE During Beta?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Beta Testing</h4>
                    <p className="text-slate-400 text-sm">Help us perfect the platform with your feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Early Adopters</h4>
                    <p className="text-slate-400 text-sm">Get grandfathered pricing when we launch</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">No Risk Trial</h4>
                    <p className="text-slate-400 text-sm">Experience full value before committing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
