// src/pages/TextAnalysis.jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Mic } from 'lucide-react';

const decades = [
  { id: '1960s', label: '1960s', years: '1960-1969' },
  { id: '1970s', label: '1970s', years: '1970-1979' },
  { id: '1980s', label: '1980s', years: '1980-1989' },
  { id: '1990s', label: '1990s', years: '1990-1999' },
  { id: '2000s', label: '2000s', years: '2000-2009' },
  { id: '2010s', label: '2010s', years: '2010-2019' },
  { id: '2020s', label: '2020s', years: '2020-2029' },
];

export default function TextAnalysis() {
  const [selectedDecade, setSelectedDecade]     = useState('2020s');
  const [method, setMethod]                     = useState('first');
  const [communities, setCommunities]           = useState([]);
  const [fullData, setFullData]                 = useState({ nodes: [], links: [] });
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);

  const decadeIndex = decades.findIndex(d => d.id === selectedDecade);

  // whenever you change networkType/method/decade, fetch full graph JSON
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${import.meta.env.BASE_URL}data/artists-network-${method}-${selectedDecade}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFullData(data);
        // extract communities
        const comms = Array.from(new Set(data.nodes.map(n => n.community)))
                            .sort((a, b) => a - b);
        setCommunities(comms);
      } catch (e) {
        console.error(e);
        setError(e.message);
        setCommunities([]);
        setFullData({ nodes: [], links: [] });
      } finally {
        setLoading(false);
        setSelectedCommunity(null);
      }
    };
    load();
  }, [selectedDecade, method]);

  const navigateDecade = delta => {
    const idx = decadeIndex + delta;
    if (idx >= 0 && idx < decades.length) {
      setSelectedDecade(decades[idx].id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Lyrical Analysis</h1>
        <p className="text-xl text-gray-300">
          Explore the themes and language patterns in Grammy-nominated music across different communities and decades
        </p>
      </header>

      {/* Controls */}
      <section className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Decade nav */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateDecade(-1)}
              disabled={decadeIndex === 0}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center min-w-[100px]">
              <div className="text-xl font-bold">{decades[decadeIndex].label}</div>
              <div className="text-sm text-gray-400">{decades[decadeIndex].years}</div>
            </div>
            <button
              onClick={() => navigateDecade(1)}
              disabled={decadeIndex === decades.length - 1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Method selector */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {[
              ['first', 'First-release'],
              ['mode',  'Mode-of-release']
            ].map(([val,label]) => (
              <button
                key={val}
                onClick={() => setMethod(val)}
                className={`px-4 py-2 rounded-md transition ${
                  method === val
                    ? 'bg-grammy-gold text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grammy-gold"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-12">{error}</div>
        ) : selectedCommunity !== null ? (
          // --- DETAILS FOR ONE COMMUNITY ---
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">
              Artists Community {selectedCommunity} — {selectedDecade}
            </h2>
            {/* word cloud */}
            <img
              src={`${import.meta.env.BASE_URL}wordclouds/${method}/${selectedDecade}_comm${selectedCommunity}_tfidf.png`}
              alt={`Word cloud for community ${selectedCommunity}`}
              className="mx-auto rounded-lg max-h-[400px] object-contain"
            />

            <div className="flex justify-center space-x-6 mb-6">
                <div className="text-center">
                    <div className="text-3xl font-bold text-grammy-gold">
                    {fullData.nodes.filter(n=>n.community===selectedCommunity).length}
                    </div>
                    <div className="text-gray-300">Artists</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-grammy-gold">
                    {fullData.links.filter(l =>
                        fullData.nodes.find(n=>n.id===l.source).community===selectedCommunity &&
                        fullData.nodes.find(n=>n.id===l.target).community===selectedCommunity
                    ).length}
                    </div>
                    <div className="text-gray-300">Connections</div>
                </div>
            </div>

            {/* LIST OF ARTISTS/WRITERS */}
            <div className="max-w-3xl mx-auto text-left">
              <h3 className="text-lg font-semibold mb-2 text-grammy-gold">
                Members of Community {selectedCommunity}
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 columns-2">
                {fullData.nodes
                  .filter(n => n.community === selectedCommunity)
                  .map(n => (
                    <li key={n.id}>{n.name}</li>
                  ))
                }
              </ul>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={() => setSelectedCommunity(null)}
            >
              ← Back to Communities
            </button>
          </div>
        ) : (
          // --- GRID OF COMMUNITIES ---
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Lyrical Themes by Community — {selectedDecade}
            </h2>
            {communities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map(c => (
                  <div
                    key={c}
                    className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition"
                    onClick={() => setSelectedCommunity(c)}
                  >
                    <h3 className="text-xl font-semibold text-center mb-2">
                      Community {c}
                    </h3>
                    <img
                      src={`${import.meta.env.BASE_URL}wordclouds/${method}/${selectedDecade}_comm${c}_tfidf.png`}
                      alt={`Word cloud for community ${c}`}
                      className="w-full h-44 object-contain rounded"
                    />
                    <p className="mt-2 text-sm text-gray-300 text-center">Click to explore</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-12">No communities found.</p>
            )}
          </div>
        )}
      </section>

      {/* Methodology Footer */}
      <section className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-gray-300">
        <h2 className="text-2xl font-bold mb-4">Text Analysis Methodology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">Data Processing</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Lyrics collected using the <code>Lyrics.ovh</code> API, max 20 samples per artist community</li>
              <li>Normalized text: lowercased, removed accents, stripped non-word characters</li>
              <li>Filtered out section headers like "Verse 1" and musical fillers like "la", "oh", etc.</li>
              <li>Excluded each artist’s name from their lyrics to avoid TF–IDF bias</li>
              <li>Grouped lyrics by network communities (via Louvain clustering)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-grammy-gold mb-2">Analysis & Visualization</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Generated TF–IDF word clouds using <code>scikit-learn</code> for each community</li>
              <li>Used <code>VADER</code> sentiment analysis to calculate average mood per community and decade</li>
              <li>Compared communities across two network groupings: by debut decade and by peak output</li>
              <li>Traced lyrical shifts over time from poetic/emotional (1960s–80s) to informal/repetitive (2010s–20s)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
