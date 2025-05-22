import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MovieForm() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/${id}`).then(res => {
        setTitle(res.data.title);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movie = { title };

    if (id) {
      await axios.put(`http://localhost:3001/${id}`, movie);
    } else {
      await axios.post('http://localhost:3001', movie);
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Título do Filme:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {id ? 'Atualizar' : 'Criar'}
      </button>
    </form>
  );
}

export default MovieForm;
