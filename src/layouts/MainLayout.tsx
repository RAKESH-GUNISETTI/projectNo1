
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-16 overflow-hidden">
        <div className="animate-fade-in [--index:0]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
