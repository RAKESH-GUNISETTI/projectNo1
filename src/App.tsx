import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import CodeGuidePage from "./pages/CodeGuidePage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import NewsDetailPage from "./pages/NewsDetailPage";

const queryClient = new QueryClient();

// ScrollToTop component to handle scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
};

// Enhanced page refresh handler that redirects users to home page
const PageRefreshHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set a flag when the page loads normally
    if (!sessionStorage.getItem('page_loaded')) {
      sessionStorage.setItem('page_loaded', 'true');
      return;
    }
    
    // Listen for page refreshes
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('page_loaded');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // If the page was refreshed (no page_loaded flag), redirect to home
    if (!sessionStorage.getItem('page_refresh_checked')) {
      sessionStorage.setItem('page_refresh_checked', 'true');
      const wasRefreshed = performance.navigation && 
        performance.navigation.type === 1;
      
      if (wasRefreshed && window.location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <PageRefreshHandler />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenges/:challengeId" element={<ChallengeDetailPage />} />
              <Route path="/code-guide" element={<CodeGuidePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
