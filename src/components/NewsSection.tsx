
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { fetchLatestNews, NewsItem } from '@/services/newsService';
import { Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchLatestNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  // Function to get a random color for tags
  const getRandomTagColor = () => {
    const colors = [
      'bg-red-500/10 text-red-500',
      'bg-blue-500/10 text-blue-500',
      'bg-green-500/10 text-green-500',
      'bg-yellow-500/10 text-yellow-500',
      'bg-purple-500/10 text-purple-500',
      'bg-indigo-500/10 text-indigo-500',
      'bg-pink-500/10 text-pink-500',
      'bg-cyan-500/10 text-cyan-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Create an extended news array with additional items
  const extendedNews = [...news, ...news.slice(0, 2)];

  return (
    <section id="news" className="section-spacing">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-12 scroll-animate" data-animation="slide-up" data-delay="200">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Latest News
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Stay updated with tech trends</h2>
          <p className="text-muted-foreground">
            Get the latest technology news and stay informed about emerging trends, product launches, and industry insights.
          </p>
        </div>

        {/* Featured news item */}
        {!loading && news.length > 0 && (
          <div className="mb-10 scroll-animate" data-animation="fade-in" data-delay="300">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64 md:h-full bg-secondary">
                  <img 
                    src={news[0].imageUrl} 
                    alt={news[0].title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getRandomTagColor()}>
                        {news[0].source}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(news[0].date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-3 transition-colors hover:text-primary">{news[0].title}</CardTitle>
                    <CardDescription className="text-base">{news[0].summary}</CardDescription>
                  </div>
                  <CardFooter className="px-0 pt-4">
                    <Button variant="outline" className="group" asChild>
                      <Link to={`/news/${news[0].id}`}>
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* News Grid - First Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {!loading && news.slice(1, 4).map((item, index) => (
            <Card 
              key={`row1-${item.id}-${index}`} 
              className="overflow-hidden hover:shadow-lg transition-all duration-500 scroll-animate" 
              data-animation="zoom-in" 
              data-delay={`${(index + 1) * 150 + 300}`}
            >
              <div className="h-48 bg-secondary">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getRandomTagColor()}>
                    {item.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(item.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <CardTitle className="text-lg transition-colors hover:text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="line-clamp-2">{item.summary}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" size="sm" className="group p-0" asChild>
                  <Link to={`/news/${item.id}`}>
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* News Grid - Second Row (Extended) */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {!loading && extendedNews.slice(4, 8).map((item, index) => (
            <Card 
              key={`row2-${item.id}-${index}`} 
              className="overflow-hidden hover:shadow-lg transition-all duration-500 scroll-animate" 
              data-animation="zoom-in" 
              data-delay={`${(index + 1) * 150 + 600}`}
            >
              <div className="h-40 bg-secondary">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <CardHeader className="p-3 pb-1">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getRandomTagColor()}>
                    {item.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(item.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <CardTitle className="text-base transition-colors hover:text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <CardDescription className="text-sm line-clamp-2">{item.summary}</CardDescription>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button variant="ghost" size="sm" className="group p-0 text-sm" asChild>
                  <Link to={`/news/${item.id}`}>
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center scroll-animate" data-animation="fade-in" data-delay="900">
          <Button asChild size="lg">
            <Link to="/news">View All Tech News</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
