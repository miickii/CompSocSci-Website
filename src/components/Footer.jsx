import { Github, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-black bg-opacity-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <a href="https://github.com" className="text-gray-400 hover:text-grammy-gold transition">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;