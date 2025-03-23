
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get('email') as string;
    
    if (email) {
      toast.success("Thanks for subscribing! We'll keep you updated.");
      form.reset();
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="border-t py-12 md:py-16 bg-secondary/20">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 scroll-animate">
            <Link 
              to="/"
              className="text-2xl font-semibold flex items-center space-x-2"
            >
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">Byte</span>
              <span>Bolt</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your ultimate platform for tech news, AI-powered chat assistance, coding challenges, and developer resources.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@bytebolt.com" 
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="scroll-animate" style={{ animationDelay: '100ms' }}>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  AI Chat
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Tech News
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/code-guide" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Code Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="scroll-animate" style={{ animationDelay: '200ms' }}>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="scroll-animate" style={{ animationDelay: '300ms' }}>
            <h3 className="font-medium text-lg mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest tech news and features.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Your email" 
                  className="w-full" 
                  required
                />
                <Button type="submit" size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ByteBolt. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
