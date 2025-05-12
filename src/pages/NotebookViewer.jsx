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
    setNotebookUrl("https://nbviewer.org/github/yourusername/repo/blob/main/Grammy_Collaboration_Analysis.ipynb");
    
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
          Explore the detailed analysis and methodology behind the Grammy Collaboration Networks
        </p>
      </div>
      
      <div className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-grammy-gold mr-2" />
            <h2 className="text-2xl font-semibold">Jupyter Notebook</h2>
          </div>
          <div className="flex space-x-3">
            <a 
              href="/notebooks/Grammy_Collaboration_Analysis.ipynb" 
              download
              className="flex items-center space-x-1 px-4 py-2 bg-grammy-gold text-black rounded hover:bg-yellow-400 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
            <a 
              href={notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in nbviewer</span>
            </a>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6">
          This notebook contains the full technical explanation of our data collection, processing, and network analysis. 
          It includes code for network construction, visualization parameters, and statistical analysis of the collaboration patterns.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Key Topics Covered:</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Data acquisition and cleaning procedures</li>
            <li>Network construction methodology</li>
            <li>Centrality measures and community detection</li>
            <li>Temporal analysis of collaboration patterns</li>
            <li>Genre-based clustering and cross-genre collaboration</li>
            <li>Statistical significance of network properties</li>
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
        
        <iframe
          title="Grammy Collaboration Networks Notebook"
          src={notebookUrl}
          className={`w-full ${isLoading ? 'h-0' : 'h-[800px]'} border-0`}
          onLoad={() => setIsLoading(false)}
        />
        
        {error && (
          <div className="p-6 text-center">
            <p className="text-yellow-400 mb-4">{error}</p>
            <p className="text-gray-300">
              Please use the "Open in nbviewer" button above to view the notebook directly.
            </p>
          </div>
        )}
      </div>
      
      <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-3">Running the Notebook Locally</h3>
        <p className="text-gray-300 mb-4">
          To run this notebook on your local machine:
        </p>
        <ol className="list-decimal pl-6 text-gray-300 space-y-2">
          <li>Download the notebook using the download button above</li>
          <li>Install Jupyter Notebook or JupyterLab: <code className="bg-gray-700 px-2 py-1 rounded">pip install jupyter</code></li>
          <li>Install the required packages: <code className="bg-gray-700 px-2 py-1 rounded">pip install pandas networkx matplotlib seaborn scipy</code></li>
          <li>Download our datasets from the Datasets page</li>
          <li>Run Jupyter: <code className="bg-gray-700 px-2 py-1 rounded">jupyter notebook</code></li>
          <li>Open the downloaded notebook file</li>
        </ol>
      </div>
    </div>
  );
}

export default NotebookViewer;