// src/components/NetworkVisualization.jsx
import React, { useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function NetworkVisualization({
  graphData,
  loading,
  error,
  highlightComms = []
}) {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading…</div>;
  if (error)   return <div className="h-96 flex items-center justify-center text-red-500">{error}</div>;
  if (!graphData.nodes.length) 
    return <div className="h-96 flex items-center justify-center text-gray-400">No data.</div>;

  return (
    <div className="relative">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="community"
        nodeCanvasObject={(node, ctx, scale) => {
          const r = Math.sqrt(node.value||5);
          const isHi = highlightComms.length===0 || highlightComms.includes(node.community);
          ctx.beginPath();
          ctx.arc(node.x,node.y,r,0,2*Math.PI);
          ctx.fillStyle = isHi ? node.color : 'rgba(200,200,200,0.2)';
          ctx.fill();
          ctx.lineWidth = 1/scale; ctx.strokeStyle='#000'; ctx.stroke();
          if(isHi){
            ctx.font = `${12/scale}px Sans`;
            ctx.textAlign='center'; ctx.textBaseline='top';
            ctx.fillStyle='#fff';
            ctx.fillText(node.name,node.x,node.y+r+2/scale);
          }
        }}
        linkColor={l=>{
          const s = graphData.nodes.find(n=>n.id===l.source)?.community;
          const t = graphData.nodes.find(n=>n.id===l.target)?.community;
          const both = highlightComms.length===0 || (highlightComms.includes(s)&&highlightComms.includes(t));
          return both ? 'rgba(180,180,180,0.6)' : 'rgba(180,180,180,0.1)';
        }}
        linkWidth={1}
        width={window.innerWidth-80}
        height={600}
        backgroundColor="transparent"
        onNodeClick={node=>{
          setSelectedNode(node);
          fgRef.current.centerAt(node.x,node.y,400);
          fgRef.current.zoom(4,600);
        }}
      />

      {/* side‐panel for selected node */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-gray-800 text-gray-200 p-4 rounded-lg max-w-xs shadow-lg">
          <h4 className="text-xl font-semibold mb-2 text-grammy-gold">{selectedNode.name}</h4>
          {selectedNode.genre && selectedNode.genre.length>0 && (
            <>
              <p className="font-medium mb-1">Genres:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {selectedNode.genre.map((g,i)=>(
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </>
          )}
          <button
            className="mt-3 text-sm text-gray-400 hover:text-grammy-gold"
            onClick={()=>setSelectedNode(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
