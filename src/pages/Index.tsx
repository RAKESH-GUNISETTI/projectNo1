
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { NewsSection } from "@/components/NewsSection";
import { ChatBot } from "@/components/ChatBot";
import { useEffect, useRef } from "react";

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
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
        // Adjust when animation triggers (element is 15% visible)
        const isVisible = rect.top < window.innerHeight * 0.85;
        
        if (isVisible) {
          // Check for custom animation type
          const animationType = element.getAttribute('data-animation') || 'fade-in';
          const animationClass = animationEffects[animationType] || 'animate-fade-in';
          
          element.classList.add(animationClass);
        }
      });
    };

    // Initial check for elements in view
    setTimeout(handleScroll, 100);
    
    // Listen for scroll events with throttling for performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = undefined as unknown as NodeJS.Timeout;
        }, 100); // 100ms throttle
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
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax" data-speed="0.2"></div>
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl parallax" data-speed="0.3"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl parallax" data-speed="0.15"></div>
        </div>
        
        <Hero />
        <Features />
        <ChatBot />
        <NewsSection />
      </div>
    </MainLayout>
  );
};

export default Index;
