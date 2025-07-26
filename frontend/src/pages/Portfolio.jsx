import React, { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import WhatsAppButton from "../components/WhatsAppButton";
import { mockData } from "../components/mock";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredProjects = activeCategory === "All" 
    ? mockData.portfolio.projects 
    : mockData.portfolio.projects.filter(project => project.category === activeCategory);

  const openVideoModal = (project) => {
    setSelectedVideo(project);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-xl text-cream-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Dive into our collection of cinematic masterpieces. Each project tells a unique story, 
            crafted with passion and precision to deliver visual excellence that resonates.
          </p>
          
          {/* Full Portfolio Access Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group"
            >
              <a 
                href={mockData.contact.fullPortfolioLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                🎬 Complete Portfolio Drive
                <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            
            <p className="text-cream-400 text-sm">
              Access our complete collection of 100+ videos
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-800/50 sticky top-20 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {mockData.portfolio.categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-slate-900 hover:from-orange-600 hover:to-yellow-600"
                    : "border-orange-400/50 text-orange-400 hover:bg-orange-400 hover:text-slate-900"
                }`}
              >
                {category === "Talking-Head Videos" ? "Talking-Head" : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="lg"
                      className="bg-orange-500/90 hover:bg-orange-600 text-white rounded-full h-16 w-16 p-0 backdrop-blur-sm"
                      onClick={() => openVideoModal(project)}
                    >
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* External Link */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={() => window.open(project.videoUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-cream-100 mb-2 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-cream-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-cream-100 mb-2">No projects found</h3>
              <p className="text-cream-300">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-12 border border-orange-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              Ready to create your next masterpiece?
            </h2>
            <p className="text-cream-300 mb-8 max-w-2xl mx-auto text-lg">
              Let's bring your vision to life with the same passion and excellence 
              showcased in our portfolio. Every story deserves to be told beautifully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <a href="/contact">Start Your Project</a>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-slate-900/30 group"
              >
                <a 
                  href={mockData.contact.fullPortfolioLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  🎬 Browse Complete Drive
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden">
            <Button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2"
              size="sm"
            >
              ✕
            </Button>
            <div className="aspect-video">
              <iframe
                src={selectedVideo.videoUrl.includes('instagram.com') 
                  ? selectedVideo.videoUrl + 'embed/' 
                  : selectedVideo.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-cream-100 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-cream-300">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;