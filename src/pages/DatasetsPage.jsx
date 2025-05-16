import { Database, FileText, Table, ExternalLink } from 'lucide-react';

function DatasetItem({ title, description, url, size, rows, columns, format }) {
  return (
    <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Table className="w-6 h-6 text-grammy-gold mr-3" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-3 py-1 text-sm text-grammy-gold hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View on Google Drive</span>
        </a>
      </div>
      
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-700 bg-opacity-50 p-3 rounded">
          <span className="text-gray-400">Format:</span> 
          <span className="ml-2 font-medium">{format}</span>
        </div>
        <div className="bg-gray-700 bg-opacity-50 p-3 rounded">
          <span className="text-gray-400">Size:</span> 
          <span className="ml-2 font-medium">{size}</span>
        </div>
        <div className="bg-gray-700 bg-opacity-50 p-3 rounded">
          <span className="text-gray-400">Rows:</span> 
          <span className="ml-2 font-medium">{rows.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function DatasetsPage() {
  const datasets = [
    {
      title: "Artist Dataset",
      description: "Biographical data for all Grammy-nominated artists in our scope, including names, types, debut years, and genders (when available). Used to group artists by decade and understand demographic distributions.",
      url: "https://drive.google.com/file/d/1hn8j9aPfsy2VOoMnAWiMTF2fd7-zmWSf/view",  
      size: "61 KB",
      rows: 547,
      columns: 6,
      format: "CSV"
    },
    {
      title: "Song Dataset",
      description: "Full discography data for nominated artists, retrieved from MusicBrainz. Contains over 687,000 recordings, used to identify writers and track release patterns over time.",
      url: "https://drive.google.com/file/d/1tl3l98lHu2f3lTXC9RZ-Q2V75Kp7IDXn/view", 
      size: "100.9 MB",
      rows: 687306,
      columns: 5,
      format: "CSV"
    },
    {
      title: "Writership Dataset",
      description: "Links between writers and the recordings they contributed to, including role type (e.g., lyricist, composer). Core data for constructing both artist–artist and writer–writer networks.",
      url: "https://drive.google.com/file/d/1QDDh4kaX5pSHOPvIyiMtSaRH3nxQF3sN/view",  
      size: "1000.5 MB",
      rows: 6231716,
      columns: 4,
      format: "CSV"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Datasets</h1>
        <p className="text-xl text-gray-300">
          Explore the data powering our analysis of Grammy songwriting networks
        </p>
      </div>
      
      <div className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
        <div className="flex items-center mb-4">
          <Database className="w-6 h-6 text-grammy-gold mr-2" />
          <h2 className="text-2xl font-semibold">About Our Data</h2>
        </div>
        
        <p className="text-gray-300 mb-4">
          We combined public APIs and databases such as MusicBrainz and Lyrics.ovh to build a detailed, multi-decade dataset of artists, songs, and songwriting collaborations. Our focus was on the top Grammy categories: 
          Album of the Year, Record of the Year, Song of the Year, and Best New Artist.
        </p>
        
        <p className="text-gray-300 mb-4">
          These datasets allowed us to construct bipartite and projected networks, uncover songwriter communities, and analyze the evolution of lyrical themes across decades. All data has been cleaned and normalized 
          to allow consistent temporal and structural comparisons.
        </p>
        
        <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border border-yellow-700">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-yellow-400">Data Note</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Some data may be incomplete due to API limitations (e.g., missing lyrics or ISRC codes). Sources include MusicBrainz, Lyrics.ovh, and publicly available Grammy data.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Available Datasets</h2>
        {datasets.map((dataset, index) => (
          <DatasetItem key={index} {...dataset} />
        ))}
      </div>
    </div>
  );
}

export default DatasetsPage;
