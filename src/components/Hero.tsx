
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  const phrases = [
    "Build amazing applications",
    "Explore cutting-edge tech",
    "Master coding challenges",
    "Stay updated with tech news",
    "Enhance your coding skills"
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        // Pause at the end of typing
        setTypingSpeed(1500);
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        // Move to the next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setTypingSpeed(100);
      } else if (isDeleting) {
        // Delete characters
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        // Add characters
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, typingSpeed, phrases]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-0"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-2 animate-slide-down" style={{ '--index': 0 } as React.CSSProperties}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              <span className="block">Tech Innovation with</span>
              <span className="block text-primary">ByteBolt</span>
            </h1>
            
            <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden">
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground typing-container">
                {displayText}
              </h2>
            </div>
          </div>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-down" style={{ '--index': 1 } as React.CSSProperties}>
            Your ultimate platform for tech news, AI-powered chat assistance, coding challenges, and developer resources.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-down" style={{ '--index': 2 } as React.CSSProperties}>
            <Button asChild size="lg" className="px-8 group transition-all duration-300 hover:pr-10">
              <Link to="/chat">
                Try AI Chat
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/news">
                Explore Tech News
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-down" style={{ '--index': 3 } as React.CSSProperties}>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">AI Support</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground mt-1">Tech Challenges</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">Latest</div>
              <div className="text-sm text-muted-foreground mt-1">Tech News</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground mt-1">Code Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
