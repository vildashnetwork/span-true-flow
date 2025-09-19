import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Since we couldn't download videos, we'll use placeholder video URLs
  // In a real implementation, these would be your downloaded video files
  const videos = [
    {
      id: 1,
      title: 'Global Logistics Network',
      description: 'Our worldwide distribution centers ensure fast, reliable shipping to any destination.',
      thumbnail: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=450&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_1mb.mp4'
    },
    {
      id: 2,
      title: 'Advanced Warehousing',
      description: 'State-of-the-art facilities with automated systems for efficient package handling.',
      thumbnail: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=450&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_2mb.mp4'
    },
    {
      id: 3,
      title: 'Express Delivery Fleet',
      description: 'Modern vehicles equipped with GPS tracking for real-time package monitoring.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_5mb.mp4'
    }
  ];

  const handleVideoPlay = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-6">
            See Our Services in 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch how SpanTrue Courier delivers excellence through cutting-edge logistics solutions 
            and world-class service standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                {activeVideo === video.id ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted={isMuted}
                      poster={video.thumbnail}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        onClick={toggleMute}
                        size="sm"
                        className="bg-black/50 hover:bg-black/70 text-white p-2"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => setActiveVideo(null)}
                        size="sm"
                        className="bg-black/50 hover:bg-black/70 text-white p-2"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Video Thumbnail */}
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handleVideoPlay(video.id)}
                        size="lg"
                        className="bg-white/90 hover:bg-white text-primary hover:text-primary-dark rounded-full p-6 group-hover:scale-110 transition-all duration-300 shadow-2xl"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>

                    {/* Video Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      2:30
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6 bg-card">
                <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Hover Accent Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience SpanTrue Excellence?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of satisfied customers who trust us with their shipping needs.
            </p>
            <Button className="btn-accent text-lg px-8 py-3">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};