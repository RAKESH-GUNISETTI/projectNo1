
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsItem, fetchLatestNews } from '@/services/newsService';
import { ArrowRight, ExternalLink, ChevronDown, ChevronUp, Calendar, Tag, User } from 'lucide-react';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLatestNews();
        setNews(data.slice(0, 9)); // Showing up to 9 news items (3 rows of 3)
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  // Function to render news cards with animation
  const renderNewsCard = (item: NewsItem, index: number, rowIndex: number = 0) => {
    const cardStyles = [
      "overflow-hidden shadow-sm hover:shadow-lg transition-all duration-700 hover:translate-y-[-4px] scroll-animate",
      "glass-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-700 hover:translate-y-[-4px] scroll-animate",
      "overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-700 hover:translate-y-[-4px] scroll-animate bg-secondary/30"
    ];
    
    const animations = [
      "slide-up",
      "slide-right",
      "fade-in"
    ];
    
    return (
      <Card 
        key={item.id} 
        className={cardStyles[rowIndex % cardStyles.length]}
        style={{ animationDelay: `${(index * 200) + (rowIndex * 300)}ms` }}
        data-animation={animations[rowIndex % animations.length]}
        data-delay={`${index * 150}`}
      >
        <div className="w-full aspect-video overflow-hidden group">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{item.summary}</p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(item.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {item.source}
            </div>
            {item.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {item.category}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button variant="ghost" size="sm" asChild className="group">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1">
              Read more
              <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <section id="news" className="section-spacing relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate" data-animation="fade-in" data-delay="200">
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
          <div className="space-y-12">
            {/* First row of news - Standard cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item, index) => renderNewsCard(item, index, 0))}
            </div>
            
            {/* Second row of news - Glass cards */}
            {news.length > 3 && (
              <div className="grid md:grid-cols-3 gap-8">
                {news.slice(3, 6).map((item, index) => renderNewsCard(item, index, 1))}
              </div>
            )}
            
            {/* Third row of news - Accent colored cards */}
            {news.length > 6 && (
              <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${showMore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 h-0 overflow-hidden md:h-auto md:overflow-visible'}`}>
                {news.slice(6, 9).map((item, index) => renderNewsCard(item, index, 2))}
              </div>
            )}
            
            {/* Toggle button for mobile and additional news */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowMore(!showMore)}
                className="group transition-all duration-300 hover:shadow-md"
              >
                {showMore ? (
                  <>Show less <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" /></>
                ) : (
                  <>Show more <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" /></>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center scroll-animate" data-animation="fade-in" data-delay="400">
          <Button asChild variant="outline" className="group hover:shadow-md hover:bg-primary/5 transition-all duration-300">
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
