import { Link } from 'react-router-dom';
import { ArrowRight, Users, Mic, Music } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-grammy-gold bg-clip-text text-transparent">
          Grammy Collaboration Networks
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore the hidden connections between Grammy-nominated artists, songwriters, 
          and producers across decades of music history.
        </p>
        <Link 
          to="/explorer" 
          className="inline-flex items-center space-x-2 bg-grammy-gold text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition font-semibold"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Project Overview */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">About This Project</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 mb-6">
            The music industry is shaped not only by the artists who perform but also by the vast 
            networks of collaborators who contribute to their work—particularly songwriters and producers.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            This project focuses on the top Grammy categories: Album of the Year, Record of the Year, 
            Song of the Year, and Best New Artist. These genre-agnostic categories represent the most 
            culturally significant and commercially visible names in music.
          </p>
          <p className="text-lg text-gray-300">
            We've constructed two network graphs to explore these connections across different decades, 
            revealing how closely connected the top tier of the music world really is.
          </p>
        </div>
      </section>

      {/* Network Types */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Two Network Views</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-grammy-gold" />
              <h3 className="text-xl font-semibold">Writer Networks</h3>
            </div>
            <p className="text-gray-300">
              Nodes represent writers, and edges connect writers who have both worked on 
              the same artist's discography. Discover the unseen songwriting collaborations 
              behind Grammy-nominated music.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Mic className="w-8 h-8 text-grammy-gold" />
              <h3 className="text-xl font-semibold">Artist Networks</h3>
            </div>
            <p className="text-gray-300">
              Nodes represent artists, and edges connect artists who have worked with 
              the same writer. Explore how artists are connected through shared 
              songwriting collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-800 bg-opacity-30 rounded-lg">
        <h2 className="text-3xl font-bold mb-12 text-center">Quick Insights</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-grammy-gold mb-2">65+</div>
            <p className="text-gray-300">Years of Grammy History</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-grammy-gold mb-2">547</div>
            <p className="text-gray-300">Artists Analyzed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-grammy-gold mb-2">5000+</div>
            <p className="text-gray-300">Collaborations Mapped</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;