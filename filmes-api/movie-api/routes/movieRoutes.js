const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const moviesPath = path.join(__dirname, '..', 'movies.json');

// Listar todos os filmes
router.get('/', (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesPath));
  res.json(movies);
});

// Obter um filme específico por ID
router.get('/:id', (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesPath));
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });
  res.json(movie);
});

// Criar um novo filme
router.post('/', (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesPath));
  const newMovie = req.body;
  newMovie.id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));
  res.status(201).json(newMovie);
});

// Atualizar um filme existente
router.put('/:id', (req, res) => {
  let movies = JSON.parse(fs.readFileSync(moviesPath));
  const index = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Filme não encontrado' });

  movies[index] = { ...movies[index], ...req.body };
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));
  res.json(movies[index]);
});

// Deletar um filme
router.delete('/:id', (req, res) => {
  let movies = JSON.parse(fs.readFileSync(moviesPath));
  const newMovies = movies.filter(m => m.id !== parseInt(req.params.id));
  if (movies.length === newMovies.length) return res.status(404).json({ message: 'Filme não encontrado' });

  fs.writeFileSync(moviesPath, JSON.stringify(newMovies, null, 2));
  res.status(204).send();
});

module.exports = router;
