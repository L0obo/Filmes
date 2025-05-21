const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});