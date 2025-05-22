import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MovieList() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:3001');
    setMovies(res.data);
  };

  const deleteMovie = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      await axios.delete(`http://localhost:3001/${id}`);
      fetchMovies();
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Adicionar Filme</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className="mb-2 border p-2 rounded">
            <strong>{movie.title}</strong>
            <div className="space-x-2 mt-2">
              <Link to={`/view/${movie.id}`} className="text-green-600">Ver</Link>
              <Link to={`/edit/${movie.id}`} className="text-yellow-600">Editar</Link>
              <button onClick={() => deleteMovie(movie.id)} className="text-red-600">Apagar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
