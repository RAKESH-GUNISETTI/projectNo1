
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Auto-play when video is in view (muted for autoplay policy)
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      setIsPlaying(true);
    }
  }, [isVisible]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Play prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      } else {
        videoRef.current.requestFullscreen().catch(err => console.log(err));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <section id="video-demo" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax" data-speed="0.2"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl parallax" data-speed="0.15"></div>
      </div>
      
      <div className="page-container relative z-10" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-10 scroll-animate" data-animation="slide-up">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Demo Video
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">See ByteBolt in action</h2>
          <p className="text-muted-foreground">
            Watch how our platform helps developers stay ahead with AI-powered assistance and the latest tech trends
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl scroll-animate group" data-animation="fade-in">
          <video 
            ref={videoRef}
            className="w-full aspect-video object-cover bg-black"
            poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            muted={isMuted}
            playsInline
          >
            <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video controls overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-600">
              <div 
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between p-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 transition-colors duration-200"
                onClick={togglePlay}
              >
                {isPlaying ? 
                  <Pause className="w-6 h-6" /> : 
                  <Play className="w-6 h-6" />
                }
              </Button>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/20 transition-colors duration-200"
                  onClick={toggleMute}
                >
                  {isMuted ? 
                    <VolumeX className="w-5 h-5" /> : 
                    <Volume2 className="w-5 h-5" />
                  }
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/20 transition-colors duration-200"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
