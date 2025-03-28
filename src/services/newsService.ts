import { NEWS_API_KEY } from "@/config/api";

// This is a mock service - in a real app, you would connect to an actual API
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
  content?: string;
}

const TECH_KEYWORDS = [
  'technology', 'software', 'hardware', 'programming', 'coding', 'computer',
  'internet', 'web', 'mobile', 'app', 'database', 'cloud', 'security',
  'network', 'algorithm', 'data', 'development', 'engineering', 'system',
  'platform', 'framework', 'language', 'api', 'server', 'client', 'frontend',
  'backend', 'devops', 'ai', 'machine learning', 'artificial intelligence',
  'blockchain', 'cryptography', 'cybersecurity'
];

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
  try {
    if (!NEWS_API_KEY) {
      throw new Error('NewsAPI key is not configured');
    }

    // Clear any existing cached news
    sessionStorage.removeItem('cachedTechNews');

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    
    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error('Invalid news data format');
    }

    // Filter and transform the news items
    const techNews = data.articles
      .filter((article: any) => {
        const title = article.title?.toLowerCase() || '';
        const description = article.description?.toLowerCase() || '';
        return TECH_KEYWORDS.some(keyword => 
          title.includes(keyword) || description.includes(keyword)
        );
      })
      .map((article: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        title: article.title || 'No Title',
        summary: article.description || 'No description available',
        source: article.source?.name || 'Unknown Source',
        date: article.publishedAt || new Date().toISOString(),
        imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        url: article.url || '#',
        content: article.content
      }));

    // Cache the new news
    sessionStorage.setItem('cachedTechNews', JSON.stringify({
      timestamp: Date.now(),
      news: techNews
    }));

    return techNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Try to load from cache if fetch fails
    const cachedData = sessionStorage.getItem('cachedTechNews');
    if (cachedData) {
      const { timestamp, news } = JSON.parse(cachedData);
      // Only use cache if it's less than 1 hour old
      if (Date.now() - timestamp < 3600000) {
        return news;
      }
    }
    
    // Return empty array if both fetch and cache fail
    return [];
  }
};

export const fetchArticleDetails = async (articleId: string): Promise<NewsItem | null> => {
  try {
    const cachedData = sessionStorage.getItem('cachedTechNews');
    if (cachedData) {
      const { news } = JSON.parse(cachedData);
      const article = news.find((item: NewsItem) => item.id === articleId);
      if (article) {
        return article;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching article details:', error);
    return null;
  }
};
