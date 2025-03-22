
// This is a mock service - in a real app, you would connect to an actual API
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
}

// Mock data for demonstration
const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Launches New AI Model with Enhanced Reasoning Capabilities",
    summary: "OpenAI has unveiled its latest AI model that demonstrates significant improvements in reasoning and problem-solving capabilities.",
    source: "Tech Insider",
    date: "2023-06-15",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: "2",
    title: "Quantum Computing Breakthrough Could Transform Cybersecurity",
    summary: "Researchers have achieved a major breakthrough in quantum computing that may have significant implications for the future of cybersecurity.",
    source: "Quantum Review",
    date: "2023-06-14",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: "3",
    title: "New Framework Promises to Simplify React Development",
    summary: "A new frontend framework built on top of React aims to simplify development workflows and improve performance for web applications.",
    source: "Dev Weekly",
    date: "2023-06-13",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: "4",
    title: "Apple Announces New Developer Tools at WWDC",
    summary: "At its annual Worldwide Developers Conference, Apple unveiled a suite of new tools and features for app developers.",
    source: "Apple Insider",
    date: "2023-06-12",
    imageUrl: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: "5",
    title: "Google Advances in Quantum Machine Learning",
    summary: "Google researchers have published promising results combining quantum computing techniques with machine learning algorithms.",
    source: "AI Journal",
    date: "2023-06-11",
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: "6",
    title: "New Programming Language Designed for Microservices",
    summary: "A new programming language specifically designed for microservices architecture promises better performance and developer experience.",
    source: "Programming Today",
    date: "2023-06-10",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#"
  }
];

// Simulate API fetch with random shuffling to get "fresh" news on reload
export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return shuffled news items to simulate "fresh" content
  return [...mockNewsData].sort(() => Math.random() - 0.5);
};
