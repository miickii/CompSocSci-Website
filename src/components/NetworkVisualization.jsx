import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph';

function NetworkVisualization({ decade, networkType, searchQuery }) {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load network data for the selected decade and type
    const loadNetworkData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual data loading
        // const response = await fetch(`/data/${networkType}-network-${decade}.json`);
        // const data = await response.json();
        
        // Placeholder data for demonstration
        const placeholderData = {
          nodes: [
            { id: 'node1', name: 'Sample Artist 1', group: 1, value: 10 },
            { id: 'node2', name: 'Sample Artist 2', group: 1, value: 15 },
            { id: 'node3', name: 'Sample Artist 3', group: 2, value: 8 },
            { id: 'node4', name: 'Sample Writer 1', group: 3, value: 20 },
            { id: 'node5', name: 'Sample Writer 2', group: 3, value: 12 },
          ],
          links: [
            { source: 'node1', target: 'node4', value: 1 },
            { source: 'node2', target: 'node4', value: 1 },
            { source: 'node3', target: 'node5', value: 1 },
            { source: 'node1', target: 'node5', value: 1 },
            { source: 'node4', target: 'node5', value: 2 },
          ]
        };
        
        setGraphData(placeholderData);
      } catch (error) {
        console.error('Error loading network data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNetworkData();
  }, [decade, networkType]);

  // Filter nodes based on search query
  const filteredGraphData = {
    nodes: graphData.nodes.filter(node => 
      node.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    links: graphData.links
  };

  // Node styling
  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );

    // Draw label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = node === selectedNode ? '#D6AF36' : '#ffffff';
    ctx.fillText(label, node.x, node.y);

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.value/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${node.group * 60}, 70%, 50%)`;
    ctx.fill();
  };

  // Handle node click
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Zoom to node
    fgRef.current?.centerAt(node.x, node.y, 1000);
    fgRef.current?.zoom(8, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grammy-gold"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ForceGraph2D
        ref={fgRef}
        graphData={filteredGraphData}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodeCanvasObject}
        linkColor={() => 'rgba(255, 255, 255, 0.2)'}
        backgroundColor="transparent"
        width={window.innerWidth - 100}
        height={600}
        onNodeClick={handleNodeClick}
        onNodeHover={(node) => {
          // Optional: Add hover effects
        }}
        warmupTicks={100}
        cooldownTicks={0}
      />
      
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg max-w-sm">
          <h4 className="font-semibold text-grammy-gold">{selectedNode.name}</h4>
          <p className="text-sm text-gray-300 mt-1">
            Connections: {selectedNode.value}
          </p>
          <p className="text-sm text-gray-300">
            Group: {selectedNode.group}
          </p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default NetworkVisualization;