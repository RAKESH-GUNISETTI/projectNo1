import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { fetchLatestNews, fetchArticleDetails, NewsItem } from '@/services/newsService';
import { Clock, ArrowRight, ExternalLink, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getNews = async () => {
    try {
      setLoading(true);
      const newsData = await fetchLatestNews();
      if (newsData && newsData.length > 0) {
        // Force a complete refresh by clearing and setting news in a single state update
        setNews(newsData);
        toast.success('News updated successfully!');
      } else {
        toast.error('No new articles found. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to fetch latest news. Please try again later.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getNews();
    // Refresh news every 5 minutes
    const interval = setInterval(getNews, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleRefreshNews = async () => {
    try {
      setIsRefreshing(true);
      setLoading(true);
      // Clear existing news immediately
      setNews([]);
      // Clear any cached news
      sessionStorage.removeItem('cachedTechNews');
      // Fetch new news
      const newNews = await fetchLatestNews();
      if (newNews && newNews.length > 0) {
        setNews(newNews);
        toast.success('News updated successfully!');
      } else {
        toast.error('No new articles found. Please try again later.');
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
      toast.error('Failed to refresh news. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

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

  // Handle opening the article dialog
  const openArticleDialog = async (article: NewsItem) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
    setIsLoadingDetails(true);

    try {
      const details = await fetchArticleDetails(article.id);
      if (details) {
        setSelectedArticle(details);
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
      toast.error('Failed to load article details. Please try again.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle opening full article
  const handleFullArticle = async (article: NewsItem) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
    setIsLoadingDetails(true);

    try {
      const details = await fetchArticleDetails(article.id);
      if (details) {
        setSelectedArticle(details);
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
      toast.error('Failed to load article details. Please try again.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <section id="news" className="section-spacing">
      <div className="page-container">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center max-w-2xl scroll-animate" data-animation="slide-up" data-delay="200">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Latest News
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Stay updated with tech trends</h2>
            <p className="text-muted-foreground">
              Get the latest technology news and stay informed about emerging trends, product launches, and industry insights.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshNews}
            disabled={isRefreshing || loading}
            className="transition-all hover:bg-primary/10"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh News'}
          </Button>
        </div>

        {/* Show loading state */}
        {(loading || isRefreshing) && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Only show news content when not loading and we have news */}
        {!loading && !isRefreshing && news.length > 0 && (
          <>
            {/* Featured news item */}
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
                    <CardFooter className="px-0 pt-4 flex gap-3">
                      <Button variant="outline" className="group" onClick={() => openArticleDialog(news[0])}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="group" 
                        onClick={() => handleFullArticle(news[0])}
                      >
                        Read Full Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>

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
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" className="group p-0" onClick={() => openArticleDialog(item)}>
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group" 
                      onClick={() => handleFullArticle(item)}
                    >
                      Full Article
                      <ExternalLink className="ml-1 h-3 w-3" />
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
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" className="group p-0 text-sm" onClick={() => openArticleDialog(item)}>
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group text-xs" 
                      onClick={() => handleFullArticle(item)}
                    >
                      Full Article
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Show message when no news is available */}
        {!loading && !isRefreshing && news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news articles available. Please try refreshing.</p>
          </div>
        )}

        <div className="text-center scroll-animate" data-animation="fade-in" data-delay="900">
          <Button asChild size="lg">
            <Link to="/news">View All Tech News</Link>
          </Button>
        </div>
      </div>

      {/* Enhanced Article Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm z-50">
          <div className="relative w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl">
            {selectedArticle && (
              <>
                <DialogHeader className="sticky top-0 bg-background z-10 border-b pb-4 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getRandomTagColor()}>
                        {selectedArticle.source}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(selectedArticle.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsDialogOpen(false)}
                      className="rounded-full hover:bg-destructive/10"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogTitle className="text-3xl font-bold">{selectedArticle.title}</DialogTitle>
                  <DialogDescription className="text-lg text-muted-foreground">
                    {selectedArticle.summary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 px-6">
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-6">
                    <img 
                      src={selectedArticle.imageUrl} 
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isLoadingDetails ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="text-lg leading-relaxed">
                        {selectedArticle.content || selectedArticle.summary}
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="sticky bottom-0 bg-background z-10 border-t pt-4 px-6">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <a 
                      href={selectedArticle.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                      Read Full Article
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
