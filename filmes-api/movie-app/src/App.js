import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Filmes CRUD</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/create" element={<MovieForm />} />
          <Route path="/edit/:id" element={<MovieForm />} />
          <Route path="/view/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
