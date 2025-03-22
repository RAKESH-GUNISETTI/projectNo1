import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  MessageSquareCode, 
  Newspaper, 
  Puzzle,
  Code, 
  User,
  LogIn,
  LogOut 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
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

        <div className="hidden md:flex items-center space-x-1">
          <Link 
            to="/"
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            <span>Home</span>
          </Link>
          <Link 
            to="/chat"
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/chat" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>AI Chat</span>
            <span className="text-xs text-muted-foreground">(Tech Only)</span>
          </Link>
          <Link 
            to="/news"
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/news" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Tech News</span>
          </Link>
          <Link 
            to="/challenges"
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/challenges" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Challenges</span>
          </Link>
          <Link 
            to="/code-guide"
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/code-guide" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code Guide</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full bg-secondary hover:bg-secondary/80">
                    <User className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/progress" className="cursor-pointer w-full">
                      Progress Tracker
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/credits" className="cursor-pointer w-full">
                      Credits: 120
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLoginToggle} className="text-destructive flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="transition-transform hover:scale-105">
                <Link to="/login" onClick={handleLoginToggle}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Link>
              </Button>
              <Button asChild className="transition-transform hover:scale-105">
                <Link to="/signup" onClick={handleLoginToggle}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>

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

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background animate-fade-in">
          <div className="flex flex-col space-y-4 pt-8 px-6">
            <Link 
              to="/"
              className="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Home</span>
            </Link>
            <Link 
              to="/chat"
              className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquareCode className="w-5 h-5" />
              <div className="flex flex-col">
                <span>AI Chat</span>
                <span className="text-xs text-muted-foreground">(Tech Only)</span>
              </div>
            </Link>
            <Link 
              to="/news"
              className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Newspaper className="w-5 h-5" />
              <span>Tech News</span>
            </Link>
            <Link 
              to="/challenges"
              className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Puzzle className="w-5 h-5" />
              <span>Challenges</span>
            </Link>
            <Link 
              to="/code-guide"
              className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Code className="w-5 h-5" />
              <span>Code Guide</span>
            </Link>
            
            <div className="border-t border-border my-2 pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/progress"
                    className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Progress Tracker
                  </Link>
                  <Link 
                    to="/credits"
                    className="px-4 py-3 rounded-md transition-colors hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Credits: 120
                  </Link>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      handleLoginToggle();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login" onClick={() => {
                      handleLoginToggle();
                      setIsMobileMenuOpen(false);
                    }}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Log In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/signup" onClick={() => {
                      handleLoginToggle();
                      setIsMobileMenuOpen(false);
                    }}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
