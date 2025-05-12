// src/components/NetworkVisualization.jsx
import { useRef, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function NetworkVisualization({
  graphData,
  loading,
  error,
  searchQuery,
  selectedComms
}) {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode]       = useState(null);

  // 1) Filter by search + community
  const filteredNodes = graphData.nodes.filter(n => {
    const keepSearch = !searchQuery
      || n.name.toLowerCase().includes(searchQuery.toLowerCase());
    const keepComm = selectedComms.length === 0
      || selectedComms.includes(n.community);
    return keepSearch && keepComm;
  });
  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredLinks = graphData.links.filter(l =>
    nodeIds.has(l.source) && nodeIds.has(l.target)
  );
  const data = { nodes: filteredNodes, links: filteredLinks };

  // 2) Color by community
  const getCommColor = useCallback(comm => {
    const hue = (comm * 137) % 360;
    return `hsl(${hue},70%,50%)`;
  }, []);

  // 3) Node drawing callback
  const drawNode = useCallback((node, ctx, globalScale) => {
    const { x, y, value, community } = node;
    const isSel = node === selectedNode;
    const isHov = node === hoverNode;
    const baseR = Math.sqrt(value) || 5;
    const r = baseR * (isSel || isHov ? 1.4 : 1);

    // draw circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = getCommColor(community);
    ctx.fill();
    ctx.lineWidth   = (isSel ? 3 : isHov ? 2 : 1) / globalScale;
    ctx.strokeStyle = isSel ? '#D6AF36' : '#000';
    ctx.stroke();

    // draw label if zoomed or hovered/selected
    if (globalScale > 1.2 || isSel || isHov) {
      const label = node.name;
      const fontSize = ((isSel || isHov ? 14 : 12) / globalScale) + 'px Sans-Serif';
      ctx.font = `${isSel ? 'bold ' : ''}${fontSize}`;
      const textW = ctx.measureText(label).width;
      const pad = 4 / globalScale;
      const bW = textW + 2 * pad;
      const bH = (parseFloat(fontSize) + 2 * pad);

      ctx.fillStyle = isSel ? 'rgba(214,175,54,0.9)' : 'rgba(0,0,0,0.7)';
      ctx.fillRect(x - bW / 2, y + r + pad, bW, bH);

      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle    = isSel ? '#000' : '#fff';
      ctx.fillText(label, x, y + r + pad + bH / 2);
    }
  }, [selectedNode, hoverNode, getCommColor]);

  // 4) Pointer-area paint callback (must use the signature (node, color, ctx))
  const paintPointerArea = useCallback((node, color, ctx) => {
    const r = Math.sqrt(node.value) || 5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  // 5) Link coloring
  const linkColor = useCallback(link => {
    if (selectedNode) {
      const connected =
        link.source === selectedNode.id || link.target === selectedNode.id;
      return connected
        ? 'rgba(214,175,54,0.8)'
        : 'rgba(200,200,200,0.1)';
    }
    return 'rgba(200,200,200,0.3)';
  }, [selectedNode]);

  // 6) Event handlers
  const onNodeClick = useCallback(node => {
    setSelectedNode(prev => (prev === node ? null : node));
    if (node && fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoomToFit(400, 100);
    }
  }, []);

  const onBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // 7) Loading / error / empty states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grammy-gold" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        {error}
      </div>
    );
  }
  if (!data.nodes.length) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        No matching nodes.
      </div>
    );
  }

  // 8) Render the ForceGraph2D
  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeCanvasObject={drawNode}
      nodePointerAreaPaint={paintPointerArea}
      linkColor={linkColor}
      linkWidth={link =>
        selectedNode && (
          link.source === selectedNode.id ||
          link.target === selectedNode.id
        )
          ? 2
          : 1
      }
      backgroundColor="transparent"
      width={window.innerWidth - 100}
      height={600}
      onNodeClick={onNodeClick}
      onNodeHover={setHoverNode}
      onBackgroundClick={onBackgroundClick}
      cooldownTicks={100}
    />
  );
}
