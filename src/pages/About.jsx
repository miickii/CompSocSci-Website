import { Users, Network, Database, Code } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-xl text-gray-300">
          Understanding the hidden connections in the music industry through Grammy nominations
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">
            The music industry is shaped not only by the artists who perform but also by the vast 
            networks of collaborators who contribute to their work—particularly songwriters and producers.
          </p>
          <p className="text-gray-300">
            In this project, we focus on the top Grammy categories: Album of the Year, Record of the Year, 
            Song of the Year, and Best New Artist, because these categories are genre-agnostic and represent 
            the most culturally significant and commercially visible names in music.
          </p>
          <p className="text-gray-300">
            By starting with these nominees, we've constructed two graphs, one to explore the writers, 
            where the nodes are writers, and an edge represents two writers who have both worked on the 
            same artist's discography, the other graph will explore the artists, where nodes are artists, 
            and an edge represents two artists who have worked with the same writer.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Methodology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-grammy-gold" />
              <h3 className="text-lg font-semibold">Data Collection</h3>
            </div>
            <p className="text-gray-300">
              Grammy nominations were collected across 50+ years of history, focusing on the top four 
              categories. Songwriter and producer credits were gathered from official music databases.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Network className="w-6 h-6 text-grammy-gold" />
              <h3 className="text-lg font-semibold">Network Construction</h3>
            </div>
            <p className="text-gray-300">
              Two networks were built: one connecting writers who share artist collaborations, 
              and another connecting artists who share writers. Each decade is analyzed separately.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Key Findings</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">Increasing Connectivity</h3>
            <p className="text-gray-300">
              The networks have become increasingly dense over time, with modern music showing 
              more collaborative patterns than previous decades.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">Hub Writers</h3>
            <p className="text-gray-300">
              Certain songwriters emerge as super-connectors, working with a disproportionate 
              number of Grammy-nominated artists across different genres.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">Cross-Genre Collaboration</h3>
            <p className="text-gray-300">
              Modern Grammy nominees show increasing cross-genre collaborations, 
              breaking down traditional musical boundaries.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-6 h-6 text-grammy-gold" />
            <h3 className="text-lg font-semibold">Technologies Used</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong>Frontend:</strong> React with TypeScript, Tailwind CSS</li>
            <li>• <strong>Visualization:</strong> react-force-graph, D3.js</li>
            <li>• <strong>Data Processing:</strong> Python with NetworkX</li>
            <li>• <strong>Deployment:</strong> GitHub Pages</li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Future Work</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Future iterations of this project could include expanded Grammy categories, 
          real-time analysis of current collaborations, and deeper investigation into 
          the impact of these networks on chart success and cultural influence.
        </p>
      </section>
    </div>
  );
}

// src/components/Footer.jsx
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

export default About;
export { Footer };