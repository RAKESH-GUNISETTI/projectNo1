
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 blur-backdrop shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="page-container flex items-center justify-between">
        <Link 
          to="/"
          className="text-2xl font-semibold flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">Byte</span>
          <span>Bolt</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link 
            to="/"
            className="px-4 py-2 rounded-md transition-colors hover:bg-secondary"
          >
            Home
          </Link>
          <Link 
            to="/chat"
            className="px-4 py-2 rounded-md transition-colors hover:bg-secondary"
          >
            AI Chat
          </Link>
          <Link 
            to="/news"
            className="px-4 py-2 rounded-md transition-colors hover:bg-secondary"
          >
            Tech News
          </Link>
          <Link 
            to="/challenges"
            className="px-4 py-2 rounded-md transition-colors hover:bg-secondary"
          >
            Challenges
          </Link>
          <Link 
            to="/code-guide"
            className="px-4 py-2 rounded-md transition-colors hover:bg-secondary"
          >
            Code Guide
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="outline" className="transition-transform hover:scale-105">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="transition-transform hover:scale-105">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="w-9 h-9 rounded-full transition-transform hover:scale-110"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background animate-fade-in">
          <div className="flex flex-col space-y-4 pt-8 px-6">
            <Link 
              to="/"
              className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/chat"
              className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Chat
            </Link>
            <Link 
              to="/news"
              className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tech News
            </Link>
            <Link 
              to="/challenges"
              className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/code-guide"
              className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Code Guide
            </Link>
            <div className="border-t border-border my-2 pt-4 flex flex-col space-y-3">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
