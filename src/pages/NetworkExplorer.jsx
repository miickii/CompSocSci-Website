// src/components/NetworkExplorer.jsx
import React, { useState, useMemo, useEffect } from 'react';
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
  const [selectedDecade, setSelectedDecade] = useState('2020s');
  const [networkType,  setNetworkType]  = useState('writers');  // writers | artists
  const [method,       setMethod]       = useState('first');    // first | mode
  const [searchQuery,  setSearchQuery]  = useState('');
  const [showFilters,  setShowFilters]  = useState(false);
  const [selectedComms,setSelectedComms]= useState([]);
  const [graphData,    setGraphData]    = useState({ nodes: [], links: [] });
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);

  const decadeIndex = useMemo(
    () => decades.findIndex(d => d.id === selectedDecade),
    [selectedDecade]
  );

  // Load JSON whenever decade, type or method changes
  useEffect(() => {
    const file = `${import.meta.env.BASE_URL}data/` +
      `${networkType}-network-${method}-${selectedDecade}.json`;

    setLoading(true);
    setError(null);
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setGraphData(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedDecade, networkType, method]);

  // All communities present
  const allComms = useMemo(() => {
    const s = new Set(graphData.nodes.map(n => n.community));
    return Array.from(s).sort((a,b)=>a-b);
  }, [graphData.nodes]);

  const toggleComm = (c) =>
    setSelectedComms(sc =>
      sc.includes(c) ? sc.filter(x=>x!==c) : [...sc, c]
    );

  const navDecade = delta => {
    const idx = decadeIndex + delta;
    if (idx >= 0 && idx < decades.length) {
      setSelectedDecade(decades[idx].id);
    }
  };

  // Basic stats
  const stats = useMemo(() => {
    const n = graphData.nodes.length;
    const m = graphData.links.length;
    const avgConn = n ? ((2*m)/n).toFixed(2) : '0.00';
    const density = n>1 ? ((2*m)/(n*(n-1))).toFixed(4) : '0.0000';
    const numComms = allComms.length;
    const commSizes = allComms.map(c =>
      graphData.nodes.filter(n => n.community === c).length
    );
    const largestComm = Math.max(...commSizes);
    const topNodes = [...graphData.nodes]
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .slice(0, 5);

    return { n, m, avgConn, density, numComms, largestComm, topNodes };
  }, [graphData]);

  return (
    <div className="space-y-6">

      {/* Controls */}
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* Network Type */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {['writers','artists'].map(type => (
              <button
                key={type}
                onClick={() => setNetworkType(type)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  networkType===type
                    ? 'bg-grammy-gold text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {type==='writers' ? <Users className="w-4 h-4"/> : <Mic className="w-4 h-4"/>}
                <span>{type.charAt(0).toUpperCase()+type.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* Decade Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={()=>navDecade(-1)}
              disabled={decadeIndex===0}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5"/>
            </button>
            <div className="text-center min-w-[100px]">
              <div className="text-xl font-bold">{decades[decadeIndex].label}</div>
              <div className="text-sm text-gray-400">{decades[decadeIndex].years}</div>
            </div>
            <button
              onClick={()=>navDecade(1)}
              disabled={decadeIndex===decades.length-1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5"/>
            </button>
          </div>

          {/* Method */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {[
              ['first', 'First-release'],
              ['mode',  'Mode-of-release']
            ].map(([val,label])=>(
              <button
                key={val}
                onClick={()=>setMethod(val)}
                className={`px-4 py-2 rounded-md transition ${
                  method===val
                    ? 'bg-grammy-gold text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                placeholder="Search nodes..."
                className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grammy-gold"
              />
            </div>
            <button
              onClick={()=>setShowFilters(f=>!f)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <Filter className="w-5 h-5"/>
            </button>
          </div>
        </div>

        {/* Community Highlights */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-gray-300 mb-2">Highlight Communities</h4>
            <div className="flex flex-wrap gap-4">
              {allComms.map(c=>(
                <label key={c} className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    className="rounded text-grammy-gold"
                    checked={selectedComms.includes(c)}
                    onChange={()=>toggleComm(c)}
                  />
                  <span>Community {c}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Graph */}
      <div className="bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm overflow-hidden">
        <NetworkVisualization
          graphData={graphData}
          loading={loading}
          error={error}
          highlightComms={selectedComms}
        />
      </div>

      {/* Stats & Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-grammy-gold">
            Network Statistics
          </h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Total Nodes:</span>
              <span className="font-medium">{stats.n}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Connections:</span>
              <span className="font-medium">{stats.m}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Connections:</span>
              <span className="font-medium">{stats.avgConn}</span>
            </div>
            <div className="flex justify-between">
              <span>Network Density:</span>
              <span className="font-medium">{stats.density}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-grammy-gold">
            Key Insights
          </h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex justify-between">
              <span>Communities detected:</span>
              <strong>{stats.numComms}</strong>
            </li>
            <li className="flex justify-between">
              <span>Largest community:</span>
              <strong>{stats.largestComm} nodes</strong>
            </li>
            <li>
              <span>Top {networkType === 'writers' ? 'writers' : 'artists'}:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {stats.topNodes.map((node, i) => (
                  <span
                    key={node.id}
                    className="inline-flex items-center space-x-1 bg-grammy-gold text-black px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{i + 1}.</span>
                    <span>{node.name}</span>
                    <span className="text-xs text-gray-700">({node.value})</span>
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
