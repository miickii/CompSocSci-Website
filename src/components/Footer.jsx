import { Github, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-black bg-opacity-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Grammy Collaboration Networks. Built with React & Tailwind CSS.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" className="text-gray-400 hover:text-grammy-gold transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-grammy-gold transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-grammy-gold transition">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;