import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CyMoviePage from './pages/CyMoviePage';
import CyMovieDetailsPage from './pages/CyMovieDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CyMoviePage />} />
        <Route path="/movieDetails/:movieId" element={<CyMovieDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
