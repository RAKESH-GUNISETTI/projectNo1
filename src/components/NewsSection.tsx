
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsItem, fetchLatestNews } from '@/services/newsService';
import { ArrowRight } from 'lucide-react';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLatestNews();
        setNews(data.slice(0, 3)); // Show only 3 news items on homepage
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <section className="section-spacing">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Latest News
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Stay updated with tech trends</h2>
          <p className="text-muted-foreground">
            Get the latest technology news and insights from around the world. We refresh our content with every visit.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-sm">
                <div className="w-full aspect-video bg-muted animate-pulse"></div>
                <CardHeader>
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                <div className="w-full aspect-video overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3">{item.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {item.source} • {new Date(item.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={item.url} className="text-primary">Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="group">
            <Link to="/news">
              View all news
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
