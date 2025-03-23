
import { MessageSquare, Newspaper, Trophy, Code } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Chat Assistant",
      description: "Get instant answers to all your technology-related questions with our AI-powered chat assistant."
    },
    {
      icon: <Newspaper className="h-10 w-10 text-primary" />,
      title: "Tech News",
      description: "Stay updated with the latest technology news and trends from around the world."
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Tech Challenges",
      description: "Test your skills with coding challenges, puzzles, and quizzes to earn rewards."
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Code Tools",
      description: "Powerful tools to generate, debug, convert, and enhance your code efficiently."
    }
  ];

  return (
    <section id="features" className="section-spacing bg-secondary/50 relative overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate" data-animation="slide-up" data-delay="200">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Everything you need to stay ahead in tech</h2>
          <p className="text-muted-foreground">
            ByteBolt offers a comprehensive suite of tools and features designed to help you navigate the fast-paced world of technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all duration-700 hover:translate-y-[-8px] hover:shadow-xl hover:shadow-primary/10 scroll-animate"
              style={{ animationDelay: `${index * 300}ms` }}
              data-animation="zoom-in"
              data-delay={`${index * 150}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 transition-all duration-500 hover:scale-110 hover:bg-primary/20 hover:rotate-6 hover:shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
