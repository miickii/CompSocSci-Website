import { useEffect, useRef, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d'; // Correct 2D package import :contentReference[oaicite:5]{index=5}
import useResizeObserver from '@react-hook/resize-observer'; // Hook for responsive sizing :contentReference[oaicite:6]{index=6}

function NetworkVisualization({ decade, networkType, searchQuery }) {
  const containerRef = useRef(null);
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Responsive resizing using ResizeObserver :contentReference[oaicite:7]{index=7}
  useEffect(() => {
    if (!containerRef.current) return;
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight
    });
  }, [containerRef.current]);

  useResizeObserver(containerRef, entry => {
    setDimensions({
      width: entry.contentRect.width,
      height: entry.contentRect.height
    });
  });

  // Load data for selected decade/type (lazy-loaded JSON) :contentReference[oaicite:8]{index=8}
  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch(`/data/${networkType}-network-${decade}.json`);
        const data = await res.json();
        if (!cancelled) setGraphData(data);
      } catch (err) {
        console.error('Error loading network data:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, [decade, networkType]);

  // Filter nodes and links based on searchQuery :contentReference[oaicite:9]{index=9}
  const filteredNodes = graphData.nodes.filter(node =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredLinks = graphData.links.filter(
    link =>
      filteredNodeIds.has(link.source) &&
      filteredNodeIds.has(link.target)
  );
  const filteredGraphData = { nodes: filteredNodes, links: filteredLinks };

  // Memoized node drawing callback :contentReference[oaicite:10]{index=10}
  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bkgd = [textWidth, fontSize].map(n => n + fontSize * 0.2);

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(
      node.x - bkgd[0] / 2,
      node.y - bkgd[1] / 2,
      ...bkgd
    );

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = node === selectedNode ? '#D6AF36' : '#FFF';
    ctx.fillText(label, node.x, node.y);

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.value / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${node.group * 60},70%,50%)`;
    ctx.fill();
  }, [selectedNode]);

  // Memoized node click handler :contentReference[oaicite:11]{index=11}
  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(8, 2000);
  }, []);

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className="flex items-center justify-center h-96"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grammy-gold"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <ForceGraph2D
        ref={fgRef}
        graphData={filteredGraphData}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodeCanvasObject}
        linkColor={() => 'rgba(255,255,255,0.2)'}
        backgroundColor="transparent"
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={handleNodeClick}
        warmupTicks={100}
        cooldownTicks={0}
      />

      {selectedNode && (
        <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg max-w-sm">
          <h4 className="font-semibold text-grammy-gold">
            {selectedNode.name}
          </h4>
          <p className="text-sm text-gray-300 mt-1">
            Connections: {selectedNode.value}
          </p>
          <p className="text-sm text-gray-300">
            Group: {selectedNode.group}
          </p>
        </div>
      )}
    </div>
  );
}

export default NetworkVisualization;
