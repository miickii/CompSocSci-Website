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
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">1. Collaboration Intensified Since the 1990s</h3>
            <p className="text-gray-300">
              Artist–artist networks have grown dramatically: the 2000s “mode-decade” graph has <strong>200+ artists</strong>
              and <strong>5,900+ edges</strong> versus just 78 artists and 1,100 edges in the 1990s.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">2. Songwriters in Tight-Knitted Teams</h3>
            <p className="text-gray-300">
              Writer–writer networks remain highly modular — in the 2000s they split into nearly <strong>600 communities</strong>,
              revealing small, stable writing teams.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">3. From Elite Cliques to Broad Collaboration</h3>
            <p className="text-gray-300">
              Assortativity in writer networks dropped sharply in the 2000s, indicating top writers increasingly co-write
              with newcomers rather than sticking to elite circles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;