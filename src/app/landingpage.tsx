"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Youtube,
  Brain,
  Rocket,
  Target,
  BarChart3,
  Layers,
  Users,
  Star,
  Clock,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description:
        "Generate engaging YouTube titles, descriptions, and scripts using advanced AI models.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Create weeks worth of content in minutes. Boost your productivity exponentially.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "SEO Optimized",
      description: "Automatically generate SEO-friendly tags and keywords to maximize your reach.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Layers,
      title: "Multiple AI Models",
      description: "Choose from DeepSeek, Gemini, GLM, and more for diverse content styles.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your content performance with comprehensive analytics and insights.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Rocket,
      title: "Scale Faster",
      description: "Grow your channel exponentially with consistent, high-quality content.",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const stats = [
    { label: "AI Models", value: "5+", icon: Brain },
    { label: "Content Generated", value: "10K+", icon: Sparkles },
    { label: "Active Users", value: "1K+", icon: Users },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
  ];

  const benefits = [
    "Generate unlimited content ideas",
    "Access to multiple AI models",
    "SEO-optimized descriptions",
    "Thumbnail idea suggestions",
    "Script outlines and structures",
    "Content history tracking",
    "Favorites management",
    "Real-time analytics",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600"
                role="img"
                aria-label="TubeGenie logo"
              >
                <Youtube className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                TubeGenie
              </span>
            </div>

            {/* Auth Logic */}
            <nav className="flex items-center gap-4" aria-label="Authentication navigation">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-blue-200 hover:text-white hover:bg-blue-900/50 cursor-pointer"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Button
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 cursor-pointer"
                  onClick={handleGetStarted}
                  aria-label="Go to dashboard"
                >
                  Get Started
                </Button>
              </SignedIn>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-4 pt-32 pb-20" aria-labelledby="hero-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 animate-fade-in">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2 inline" />
                AI-Powered YouTube Content Generator
              </Badge>

              <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold leading-tight">
                Create Viral YouTube
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Content in Seconds
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Harness the power of AI to generate compelling titles, descriptions, tags, and
                scripts for your YouTube videos. Save hours and grow your channel faster.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <SignedOut>
                  <SignInButton>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-lg px-8 py-6 cursor-pointer group"
                    >
                      Start Creating for Free
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-lg px-8 py-6 cursor-pointer group"
                    onClick={handleGetStarted}
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignedIn>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Free forever plan</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>5+ AI models</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass glow border-border hover:border-primary/50 transition-colors text-center"
              >
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to
                <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Succeed
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to supercharge your YouTube content creation workflow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="glass glow border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <Card className="glass glow border-border overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 md:p-12">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Why Choose TubeGenie
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Unlock Your Channel&apos;s
                    <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {" "}
                      Full Potential
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Join thousands of content creators who are already using TubeGenie to scale
                    their YouTube channels and save countless hours.
                  </p>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">4.9/5 Rating</p>
                      <p className="text-muted-foreground">From 1,000+ happy creators</p>
                    </div>
                    <div className="pt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>Average time saved: 10+ hours/week</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-5 h-5 text-primary" />
                        <span>100% secure and private</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="glass glow border-border overflow-hidden">
              <div className="bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10 p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to Transform Your
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Content Creation?
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join TubeGenie today and start generating viral-worthy YouTube content in seconds.
                  No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <SignedOut>
                    <SignInButton>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-lg px-8 py-6 cursor-pointer group"
                      >
                        Get Started for Free
                        <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-lg px-8 py-6 cursor-pointer group"
                      onClick={handleGetStarted}
                    >
                      Open Dashboard
                      <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </SignedIn>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  ✨ Get instant access to all features • No setup required
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-muted/20 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    TubeGenie
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-powered YouTube content generation platform built for creators.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">AI Models</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Updates</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">
                    Documentation
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Tutorials</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Support</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">About</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Privacy</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Terms</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/40 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>© 2025 TubeGenie. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
