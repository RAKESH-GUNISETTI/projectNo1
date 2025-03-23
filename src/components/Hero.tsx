
import { useState, useEffect, useRef } from 'react';
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
  
  // References for animations
  const animatedElementsRef = useRef<HTMLDivElement>(null);
  const backgroundBlobRef = useRef<HTMLDivElement>(null);
  
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

  // Enhanced mouse movement effect for interactive background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundBlobRef.current) {
        const { clientX, clientY } = e;
        const moveX = (clientX / window.innerWidth - 0.5) * 2;
        const moveY = (clientY / window.innerHeight - 0.5) * 2;
        
        // Move the background blobs based on mouse position with parallax effect
        const blobs = backgroundBlobRef.current.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
          const speed = 0.1 + (index * 0.05);
          const x = moveX * 30 * speed;
          const y = moveY * 30 * speed;
          (blob as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Trigger entrance animations with staggered delay
    const animateEntranceElements = () => {
      if (animatedElementsRef.current) {
        const elements = animatedElementsRef.current.querySelectorAll('.animate-on-scroll');
        
        elements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, 180 * index); // Increased stagger delay for more dramatic effect
        });
      }
    };
    
    // Set initial animation states
    const setInitialAnimationStates = () => {
      if (animatedElementsRef.current) {
        const elements = animatedElementsRef.current.querySelectorAll('.animate-on-scroll');
        
        elements.forEach((el) => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.transform = 'translateY(30px)'; // Increased distance for more dramatic animation
          (el as HTMLElement).style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)'; // Improved easing
        });
      }
    };
    
    setInitialAnimationStates();
    setTimeout(animateEntranceElements, 100);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced animated background elements */}
      <div ref={backgroundBlobRef} className="absolute inset-0 z-0 overflow-hidden">
        <div className="blob absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="blob absolute top-1/3 -left-1/4 w-2/3 h-2/3 bg-gradient-to-tr from-secondary/15 to-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="blob absolute bottom-1/4 right-1/3 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/15 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Small floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-500/20 rounded-full animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-secondary/20 rounded-full animate-float" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-0"></div>
      
      <div className="page-container relative z-10">
        <div ref={animatedElementsRef} className="max-w-3xl mx-auto text-center">
          <div className="space-y-2 animate-on-scroll">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              <span className="block">Tech Innovation with</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 animate-background-shine bg-[length:400%_100%]">ByteBolt</span>
            </h1>
            
            <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden">
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground typing-container">
                {displayText}
                <span className="inline-block h-6 w-0.5 bg-primary animate-blink ml-1"></span>
              </h2>
            </div>
          </div>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-on-scroll">
            Your ultimate platform for tech news, AI-powered chat assistance, coding challenges, and developer resources.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Button asChild size="lg" className="px-8 group transition-all duration-500 hover:pr-10 bg-gradient-to-r from-primary to-purple-600 hover:shadow-xl hover:shadow-primary/20 shine-effect">
              <Link to="/chat">
                Try AI Chat
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 backdrop-blur-sm border-1 border-white/20 hover:border-white/30 hover:bg-white/5 transition-all hover:shadow-md shine-effect">
              <Link to="/news">
                Explore Tech News
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center animate-on-scroll hover:scale-110 transition-transform duration-500">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">AI Support</div>
            </div>
            <div className="flex flex-col items-center animate-on-scroll hover:scale-110 transition-transform duration-500">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">100+</div>
              <div className="text-sm text-muted-foreground mt-1">Tech Challenges</div>
            </div>
            <div className="flex flex-col items-center animate-on-scroll hover:scale-110 transition-transform duration-500">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Latest</div>
              <div className="text-sm text-muted-foreground mt-1">Tech News</div>
            </div>
            <div className="flex flex-col items-center animate-on-scroll hover:scale-110 transition-transform duration-500">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Free</div>
              <div className="text-sm text-muted-foreground mt-1">Code Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
