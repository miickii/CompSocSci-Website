import { useState, useEffect } from 'react';
import { Download, ExternalLink, BookOpen } from 'lucide-react';

function NotebookViewer() {
  // State to track if the iframe has loaded
  const [isLoading, setIsLoading] = useState(true);
  const [notebookUrl, setNotebookUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set the notebook URL - this should be your GitHub hosted notebook or nbviewer URL
    // Example: "https://nbviewer.org/github/yourusername/repo/blob/main/Grammy_Collaboration_Analysis.ipynb"
    setNotebookUrl("https://nbviewer.org/github/miickii/CompSocSci-Website/blob/main/explainer.ipynb");
    
    // You could also try to dynamically check if the URL is valid
    const checkUrl = async () => {
      try {
        const response = await fetch(notebookUrl, { method: 'HEAD' });
        if (!response.ok) {
          setError("Notebook URL might not be accessible. Please check the direct link below.");
        }
      } catch (e) {
        // This might fail due to CORS, which is expected when checking external URLs
        console.log("Could not check URL, but this might be expected due to CORS");
      }
    };
    
    if (notebookUrl) {
      checkUrl();
    }
  }, [notebookUrl]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Explainer Notebook</h1>
        <p className="text-xl text-gray-300">
          Explore the full analysis pipeline behind our investigation of Grammy-nominated artists, 
          their shared songwriters, and the evolving lyrical themes in popular music from the 1960s to 2020s.
        </p>
      </div>
      
      <div className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-grammy-gold mr-2" />
            <h2 className="text-2xl font-semibold">Jupyter Notebook</h2>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6">
          This notebook contains the full technical explanation of our data collection, processing, and network analysis. 
          It includes code for network construction, visualization parameters, and statistical analysis of the collaboration patterns.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Key Topics Covered:</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Collection of Grammy nominee data from 1959–2023</li>
            <li>Retrieval of discography and writer metadata from MusicBrainz</li>
            <li>Construction of bipartite artist–writer graph and projected networks</li>
            <li>Louvain community detection across multiple decade splits</li>
            <li>Text preprocessing and TF–IDF analysis of lyrics per community</li>
            <li>Sentiment scoring using VADER to track emotional trends in music</li>
            <li>Decade-wise comparison of artist connectivity and lyrical content</li>
          </ul>
        </div>
      </div>
      
      {/* Notebook Viewer (iframe with nbviewer) */}
      <div className="w-full bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden mb-8">
        {isLoading && (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grammy-gold"></div>
          </div>
        )}
        
        <iframe src="explainer.html" className="w-full h-[800px] border-0" />

        
        {error && (
          <div className="p-6 text-center">
            <p className="text-yellow-400 mb-4">{error}</p>
            <p className="text-gray-300">
              Please use the "Open in nbviewer" button above to view the notebook directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotebookViewer;