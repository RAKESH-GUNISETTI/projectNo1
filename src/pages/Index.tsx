
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { NewsSection } from "@/components/NewsSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <ChatBot />
      <NewsSection />
    </MainLayout>
  );
};

export default Index;
