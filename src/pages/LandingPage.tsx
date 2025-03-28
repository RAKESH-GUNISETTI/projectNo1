  {/* Demo Video Section */}
  <section className="py-20 bg-gradient-to-b from-background to-muted/50">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">See ByteBolt in Action</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Watch how ByteBolt transforms your coding experience with AI-powered assistance
        </p>
      </div>
      <div className="relative rounded-xl overflow-hidden shadow-2xl bg-background/50 backdrop-blur-sm border">
        <div className="aspect-video w-full">
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1461749280684-dccba630ec2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            preload="metadata"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-programmer-working-on-code-while-drinking-coffee-4k-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold mb-2">Experience the Future of Coding</h3>
            <p className="text-muted-foreground">
              Watch how ByteBolt's AI assistant helps you write better code faster
            </p>
          </div>
        </div>
      </div>
    </div>
  </section> 