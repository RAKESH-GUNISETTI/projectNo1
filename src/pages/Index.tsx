
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { NewsSection } from "@/components/NewsSection";
import { ChatBot } from "@/components/ChatBot";
import { useEffect } from "react";

const Index = () => {
  // Add smooth scrolling behavior and animations
  useEffect(() => {
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

    // Enhanced animate elements on scroll with offset options
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // Adjust when animation triggers (element is 15% visible)
        const isVisible = rect.top < window.innerHeight * 0.85;
        
        if (isVisible) {
          element.classList.add('animate-fade-in');
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
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <Hero />
        <Features />
        <ChatBot />
        <NewsSection />
      </div>
    </MainLayout>
  );
};

export default Index;
