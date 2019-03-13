const express = require('express');
const cors = require('cors');

const newsRoutes = require('./routes/news');

const app = express();
app.use(cors());

app.use(newsRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(8080);
