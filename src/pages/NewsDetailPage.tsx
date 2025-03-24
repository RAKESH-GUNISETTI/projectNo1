
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { fetchLatestNews, NewsItem } from '@/services/newsService';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      try {
        // Check sessionStorage first for cached articles
        const cachedNews = sessionStorage.getItem('cachedNews');
        let newsData: NewsItem[] = [];
        
        if (cachedNews) {
          newsData = JSON.parse(cachedNews);
        } else {
          newsData = await fetchLatestNews();
          sessionStorage.setItem('cachedNews', JSON.stringify(newsData));
        }
        
        const found = newsData.find(item => item.id === id);
        if (found) {
          setArticle(found);
          // Also set related articles (excluding current one)
          setRelatedArticles(newsData.filter(item => item.id !== id).slice(0, 3));
        } else {
          toast.error('Article not found');
          navigate('/news');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        toast.error('Failed to load article. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadArticle();
    }
  }, [id, navigate]);

  // Function to get a random tag color (same as in NewsSection)
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

  return (
    <MainLayout>
      <div className="page-container py-8">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 flex items-center gap-2" 
          onClick={() => navigate('/news')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-muted rounded w-1/4 animate-pulse"></div>
            <div className="h-80 bg-muted rounded w-full animate-pulse mt-6"></div>
            <div className="space-y-2 mt-6">
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        ) : article ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getRandomTagColor()}>
                  {article.source}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(article.date), 'MMMM d, yyyy')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-lg text-muted-foreground">{article.summary}</p>
            </div>

            <div className="relative h-80 md:h-96 bg-secondary rounded-lg overflow-hidden mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between items-center border-y py-4 mb-8">
              <div className="text-sm text-muted-foreground">
                By <span className="font-medium">Tech Editor</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="rounded-full" title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full" title="Bookmark">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full" title="Like">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="prose dark:prose-invert prose-lg max-w-none mb-12">
              <p>
                This is a detailed view of the article about {article.title}. In a real implementation, this would be the full content of the article with proper formatting and detail.
              </p>
              <p>
                The technology described in this article represents a significant advancement in the field. Experts predict it will have far-reaching implications for how we develop and interact with software in the coming years.
              </p>
              <blockquote>
                "This technology represents one of the most important shifts we've seen in recent years. Its potential applications span multiple industries and use cases." — Industry Expert
              </blockquote>
              <h2>Key Technical Details</h2>
              <p>
                The underlying architecture combines several cutting-edge approaches to solve long-standing problems in the domain:
              </p>
              <ul>
                <li>Advanced parallel processing capabilities that maximize efficiency</li>
                <li>Novel algorithms that reduce computational complexity by an order of magnitude</li>
                <li>Seamless integration with existing systems and frameworks</li>
                <li>Built-in security features that address common vulnerabilities</li>
              </ul>
              <h2>Future Directions</h2>
              <p>
                As the technology continues to mature, we can expect several key developments:
              </p>
              <ol>
                <li>Expanded tooling and developer ecosystems</li>
                <li>Performance optimizations for specialized use cases</li>
                <li>Broader adoption across enterprise and consumer applications</li>
              </ol>
              <p>
                Early adopters are already reporting significant improvements in development velocity and system performance, with some teams seeing productivity gains of up to 30%.
              </p>
            </div>

            <div className="border-t pt-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-40 bg-secondary">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">{item.summary}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={() => navigate(`/news/${item.id}`)}
                      >
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/news')}>Return to News</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewsDetailPage;
