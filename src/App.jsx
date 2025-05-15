import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NetworkExplorer from './pages/NetworkExplorer';
import NotebookViewer from './pages/NotebookViewer';
import DatasetsPage from './pages/DatasetsPage';
import About from './pages/About';
import TextAnalysis from './pages/TextAnalysis';
import './App.css';

function App() {
  return (
    <Router basename="/CompSocSci-Website">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorer" element={<NetworkExplorer />} />
            <Route path="/text-analysis" element={<TextAnalysis />} />
            <Route path="/notebook" element={<NotebookViewer />} />
            <Route path="/datasets" element={<DatasetsPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;