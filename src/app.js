const express = require('express');
const app = express();

app.use(express.json())

const authorRouter = require('./routes/authors')
app.use('/authors', authorRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Use GET, POST, PUT, DELETE requests with authors/:id, authors/:id/posts etc.');
})

function errorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({err: err.message});
    return;
  }

  res.sendStatus(500);
}

module.exports = app;