
import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { fetchLatestNews, NewsItem } from '@/services/newsService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { ExternalLink } from 'lucide-react';

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const latestNews = await fetchLatestNews();
      setNews(latestNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <h1 className="text-3xl font-bold mb-2">Latest Tech News</h1>
        <p className="text-muted-foreground mb-8">
          Stay updated with the latest developments in the tech world
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden opacity-70 animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>
                    {item.source} • {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {item.summary}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Read Full Article
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button onClick={loadNews} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh News'}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsPage;
