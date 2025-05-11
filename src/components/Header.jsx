import { Link } from 'react-router-dom';
import { Trophy, Network, Info } from 'lucide-react';

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
              to="/about" 
              className="flex items-center space-x-1 hover:text-grammy-gold transition"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;