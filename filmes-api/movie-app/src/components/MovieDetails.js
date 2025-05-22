import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/${id}`).then(res => {
      setMovie(res.data);
    });
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <Link to="/" className="text-blue-600">Voltar à lista</Link>
    </div>
  );
}

export default MovieDetails;
