// src/components/NetworkExplorer.jsx
import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Users, Mic, Search, Filter } from 'lucide-react';
import NetworkVisualization from '../components/NetworkVisualization';

const decades = [
  { id: '1960s', label: '1960s', years: '1960-1969' },
  { id: '1970s', label: '1970s', years: '1970-1979' },
  { id: '1980s', label: '1980s', years: '1980-1989' },
  { id: '1990s', label: '1990s', years: '1990-1999' },
  { id: '2000s', label: '2000s', years: '2000-2009' },
  { id: '2010s', label: '2010s', years: '2010-2019' },
  { id: '2020s', label: '2020s', years: '2020-2029' },
];

export default function NetworkExplorer() {
  // UI state
  const [selectedDecade, setSelectedDecade] = useState('2020s');
  const [networkType, setNetworkType]       = useState('writers');
  const [searchQuery, setSearchQuery]       = useState('');
  const [showFilters, setShowFilters]       = useState(false);

  // Data state
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  // Community filter state
  const [selectedComms, setSelectedComms] = useState([]);

  // 1️⃣ Fetch graph JSON once on decade/type change
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const type = networkType.replace(/s$/, ''); // drop trailing "s"
        const url  = `${import.meta.env.BASE_URL}data/${type}-network-${selectedDecade}.json`;
        const res  = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setGraphData({ nodes: data.nodes, links: data.links });
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(err.message);
          setGraphData({ nodes: [], links: [] });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [selectedDecade, networkType]);

  // 2️⃣ Derive list of all communities present in the data
  const allComms = useMemo(() => {
    const comms = new Set(graphData.nodes.map(n => n.community ?? 0));
    return Array.from(comms).sort((a, b) => a - b);
  }, [graphData]);

  // 3️⃣ Reset community filters whenever we load new data
  useEffect(() => {
    setSelectedComms([]);
  }, [graphData]);

  // Decade navigation helpers
  const currentIndex = decades.findIndex(d => d.id === selectedDecade);
  const navigateDecade = dir => {
    const idx = currentIndex + dir;
    if (idx >= 0 && idx < decades.length) {
      setSelectedDecade(decades[idx].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Network Type Toggle */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setNetworkType('writers')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                networkType === 'writers'
                  ? 'bg-grammy-gold text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Writers</span>
            </button>
            <button
              onClick={() => setNetworkType('artists')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                networkType === 'artists'
                  ? 'bg-grammy-gold text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Artists</span>
            </button>
          </div>

          {/* Decade Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateDecade(-1)}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center min-w-[100px]">
              <div className="text-xl font-bold">{decades[currentIndex].label}</div>
              <div className="text-sm text-gray-400">{decades[currentIndex].years}</div>
            </div>
            <button
              onClick={() => navigateDecade(1)}
              disabled={currentIndex === decades.length - 1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Toggle */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grammy-gold"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
            {/* Community Filter */}
            <div>
              <p className="text-sm font-medium text-gray-300">Communities:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {allComms.map(comm => (
                  <label key={comm} className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      className="rounded text-grammy-gold"
                      checked={selectedComms.includes(comm)}
                      onChange={() =>
                        setSelectedComms(prev =>
                          prev.includes(comm)
                            ? prev.filter(c => c !== comm)
                            : [...prev, comm]
                        )
                      }
                    />
                    <span className="text-gray-300">#{comm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm overflow-hidden">
        <NetworkVisualization
          graphData={graphData}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          selectedComms={selectedComms}
        />
      </div>

      {/* Info Panel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-grammy-gold">
            Network Statistics
          </h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Total Nodes:</span>
              <span className="font-medium">--</span>
            </div>
            <div className="flex justify-between">
              <span>Total Connections:</span>
              <span className="font-medium">--</span>
            </div>
            <div className="flex justify-between">
              <span>Average Connections:</span>
              <span className="font-medium">--</span>
            </div>
            <div className="flex justify-between">
              <span>Network Density:</span>
              <span className="font-medium">--</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-grammy-gold">
            Key Insights
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Most connected {networkType === 'writers' ? 'writer' : 'artist'}: --</li>
            <li>• Emerging collaboration patterns: --</li>
            <li>• Cross-genre connections: --</li>
            <li>• Notable clusters: --</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
