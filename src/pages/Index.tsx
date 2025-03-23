
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { VideoDemo } from "@/components/VideoDemo";
import { NewsSection } from "@/components/NewsSection";
import { ChatBot } from "@/components/ChatBot";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle cursor tracer effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        // Add slight delay for trailing effect
        setTimeout(() => {
          cursorRef.current!.style.left = `${e.clientX}px`;
          cursorRef.current!.style.top = `${e.clientY}px`;
        }, 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Add enhanced scroll animation system with configurable animations
  useEffect(() => {
    // Animation mapping for different effects
    const animationEffects: Record<string, string> = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'slide-right': 'animate-slide-in-right',
      'zoom-in': 'animate-scale-in',
      'pulse': 'animate-pulse-slow',
      'float': 'animate-float',
    };
    
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Enhanced animate elements on scroll with various animation types
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // Adjust when animation triggers (element is 25% visible) - slowed down by triggering earlier
        const isVisible = rect.top < window.innerHeight * 0.75;
        
        if (isVisible) {
          // Check for custom animation type
          const animationType = element.getAttribute('data-animation') || 'fade-in';
          const animationClass = animationEffects[animationType] || 'animate-fade-in';
          const delay = element.getAttribute('data-delay') || '0';
          
          // Set a delay if specified
          if (delay !== '0') {
            setTimeout(() => {
              element.classList.add(animationClass);
            }, parseInt(delay));
          } else {
            element.classList.add(animationClass);
          }
        }
      });
    };

    // Initial check for elements in view
    setTimeout(handleScroll, 300); // Increased initial delay for slower animations
    
    // Listen for scroll events with throttling for performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = undefined as unknown as NodeJS.Timeout;
        }, 150); // Increased throttle time for slower animations
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Add parallax effect to background elements
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      const scrollPosition = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrollPosition * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('scroll', handleParallax);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <MainLayout>
      <div className="page-container" ref={pageRef}>
        {/* Cursor tracer effect */}
        <div 
          ref={cursorRef}
          className="fixed w-8 h-8 pointer-events-none z-50 rounded-full bg-primary/20 blur-md transition-all duration-300 opacity-70 hidden md:block"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax" data-speed="0.2"></div>
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl parallax" data-speed="0.3"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl parallax" data-speed="0.15"></div>
        </div>
        
        <Hero />
        <VideoDemo />
        <Features />
        <ChatBot />
        <NewsSection />
      </div>
    </MainLayout>
  );
};

export default Index;
