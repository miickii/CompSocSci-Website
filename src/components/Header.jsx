import { Link } from 'react-router-dom';
import { Trophy, Network, Info, BookOpen, Database, Sparkles } from 'lucide-react';

function Header() {
  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Trophy className="w-8 h-8 text-grammy-gold" />
            <span>Grammy Networks</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <span>Home</span>
            </Link>
            <Link 
              to="/explorer" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <Network className="w-4 h-4" />
              <span>Explore Networks</span>
            </Link>
            <Link 
              to="/text-analysis" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Text Analysis</span>
            </Link>
            <Link 
              to="/notebook" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explainer Notebook</span>
            </Link>
            <Link 
              to="/datasets" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <Database className="w-4 h-4" />
              <span>Datasets</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
          
          {/* Mobile menu button - could expand to show a mobile menu */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-300 hover:text-grammy-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;