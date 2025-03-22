
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-12 md:py-16">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@bytebolt.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tech News
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-muted-foreground hover:text-foreground transition-colors">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/code-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Code Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ByteBolt. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Designed with precision and care for the tech community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
