import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Image, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#766be9] flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl">SecureAI</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#766be9] hover:bg-[#655bd9]">Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Secure Your Digital Experience with{" "}
                <span className="text-[#766be9]">AI-Powered</span> Analysis
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform uses cutting-edge artificial intelligence to protect you from fake content, phishing attempts, and simplify complex legal documents.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-[#766be9] hover:bg-[#655bd9]">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#766be9] to-purple-600 rounded-lg blur opacity-30"></div>
              <div className="relative bg-background p-8 rounded-lg shadow-xl border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-muted/50 rounded-lg flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                      <Image className="h-6 w-6 text-[#766be9]" />
                    </div>
                    <h3 className="font-bold mb-2">Fake Content Detection</h3>
                    <p className="text-sm text-muted-foreground">Detect manipulated images and misleading text</p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-lg flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                      <ShieldCheck className="h-6 w-6 text-[#766be9]" />
                    </div>
                    <h3 className="font-bold mb-2">Phishing Protection</h3>
                    <p className="text-sm text-muted-foreground">Identify dangerous websites and protect your data</p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-lg flex flex-col items-center text-center md:col-span-2">
                    <div className="h-12 w-12 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-[#766be9]" />
                    </div>
                    <h3 className="font-bold mb-2">Legal Document Analysis</h3>
                    <p className="text-sm text-muted-foreground">Understand complex legal documents with AI summaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages advanced AI to provide you with reliable security and analysis tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                <span className="font-bold text-[#766be9]">1</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Upload Content</h3>
              <p className="text-muted-foreground">
                Upload images, paste text, or provide website URLs for our AI to analyze
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                <span className="font-bold text-[#766be9]">2</span>
              </div>
              <h3 className="font-bold text-xl mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced algorithms analyze the content for security threats or complexity
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-[#766be9]/20 flex items-center justify-center mb-4">
                <span className="font-bold text-[#766be9]">3</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed reports, risk assessments, and actionable insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#766be9]/10 to-purple-100/30 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who trust our platform to protect their digital experiences and simplify complex information.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-[#766be9] hover:bg-[#655bd9]">
                  Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-full bg-[#766be9] flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-bold">SecureAI</span>
            </div>
            <div className="flex gap-6 mb-4 md:mb-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 SecureAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
