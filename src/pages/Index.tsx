
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { NewsSection } from "@/components/NewsSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
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
