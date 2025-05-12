import { Download, Database, FileText, Table } from 'lucide-react';

function DatasetItem({ title, description, filename, size, rows, columns, format }) {
  return (
    <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Table className="w-6 h-6 text-grammy-gold mr-3" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <a 
          href={`/data/${filename}`} 
          download
          className="flex items-center space-x-1 px-3 py-1 bg-grammy-gold text-black rounded hover:bg-yellow-400 transition text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download {format}</span>
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
          <span className="text-gray-400">Dimensions:</span> 
          <span className="ml-2 font-medium">{rows.toLocaleString()} rows × {columns} columns</span>
        </div>
      </div>
    </div>
  );
}

function DatasetsPage() {
  const datasets = [
    {
      title: "Grammy Nominations",
      description: "Complete dataset of Grammy nominations from 1959 to 2023, including categories, nominees, and winners. This dataset is the foundation of our network analysis, providing the initial artist connections.",
      filename: "songs.csv",
      size: "1.2 MB",
      rows: 5800,
      columns: 8,
      format: "CSV"
    },
    {
      title: "Artist Information",
      description: "Comprehensive information about artists including names, identifiers, genres, and active periods. This dataset provides the biographical and genre information used in network analysis.",
      filename: "artists_all.csv",
      size: "950 KB",
      rows: 3200,
      columns: 6,
      format: "CSV"
    },
    {
      title: "Writerships Data",
      description: "Songwriting credits connecting recordings to writers. This dataset forms the basis of the writer-artist relationships used to construct our collaboration networks.",
      filename: "writerships.csv",
      size: "3.5 MB",
      rows: 12500,
      columns: 4,
      format: "CSV"
    },
    {
      title: "Artist Genres",
      description: "Genre classifications for artists, including primary and secondary genres. This dataset allows for genre-based analysis and visualization of the collaboration networks.",
      filename: "artist_genres.csv",
      size: "480 KB",
      rows: 4800,
      columns: 2,
      format: "CSV"
    },
    {
      title: "Network Data (All Decades)",
      description: "Pre-processed network data files in JSON format for each decade, ready to be visualized or analyzed. These files can be directly loaded into network visualization tools like Gephi.",
      filename: "network_data.zip",
      size: "4.2 MB",
      rows: "Multiple files",
      columns: "-",
      format: "ZIP (JSON files)"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Datasets</h1>
        <p className="text-xl text-gray-300">
          Download and explore the datasets behind the Grammy Collaboration Networks
        </p>
      </div>
      
      <div className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
        <div className="flex items-center mb-4">
          <Database className="w-6 h-6 text-grammy-gold mr-2" />
          <h2 className="text-2xl font-semibold">About Our Data</h2>
        </div>
        
        <p className="text-gray-300 mb-4">
          Our dataset collection brings together Grammy Award nomination information, artist details, and songwriting credits 
          to create a comprehensive view of the music industry's collaborative networks. The data spans over 60 years of music 
          history, focusing on the four major Grammy categories: Album of the Year, Record of the Year, Song of the Year, and 
          Best New Artist.
        </p>
        
        <p className="text-gray-300 mb-4">
          The datasets have been cleaned, normalized, and processed to ensure consistency across time periods, 
          allowing for meaningful temporal analysis of how collaboration patterns have evolved over the decades.
        </p>
        
        <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border border-yellow-700">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-yellow-400">Data Usage Note</h3>
          </div>
          <p className="text-gray-300 text-sm">
            These datasets are provided for educational and research purposes. While we've made efforts to ensure accuracy, 
            there may be occasional inconsistencies or missing data. If you use these datasets in your own research or projects, 
            please cite our project. The data is compiled from multiple sources including official Grammy records, MusicBrainz, 
            and additional research.
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Available Datasets</h2>
        
        {datasets.map((dataset, index) => (
          <DatasetItem key={index} {...dataset} />
        ))}
      </div>
      
      <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-3">Data Schema Information</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-grammy-gold">songs.csv</h4>
          <p className="text-gray-300 mb-2">Key Columns:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-4">
            <li><span className="font-medium">recording_mbid</span>: Unique identifier for the recording</li>
            <li><span className="font-medium">title</span>: Song title</li>
            <li><span className="font-medium">artist_mbid</span>: Artist identifier</li>
            <li><span className="font-medium">first_release_year</span>: Year of first release</li>
            <li><span className="font-medium">duration_ms</span>: Duration in milliseconds</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-grammy-gold">writerships.csv</h4>
          <p className="text-gray-300 mb-2">Key Columns:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-4">
            <li><span className="font-medium">recording_mbid</span>: Unique identifier for the recording</li>
            <li><span className="font-medium">writer_id</span>: Identifier for the writer</li>
            <li><span className="font-medium">role</span>: Writing role or contribution type</li>
            <li><span className="font-medium">sequence</span>: Order of writing credits</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-grammy-gold">artists_all.csv</h4>
          <p className="text-gray-300 mb-2">Key Columns:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li><span className="font-medium">artist_mbid</span>: Unique identifier for the artist</li>
            <li><span className="font-medium">name</span>: Artist name</li>
            <li><span className="font-medium">sort_name</span>: Name used for sorting</li>
            <li><span className="font-medium">artist_type</span>: Type of artist (person, group, etc.)</li>
            <li><span className="font-medium">gender</span>: Gender information (if applicable)</li>
            <li><span className="font-medium">begin_date_year</span>: Year when artist began career</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DatasetsPage;