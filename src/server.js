const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

const authorRouter = require('./routes/authors')
app.use('/authors', authorRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
})

function errorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({err: err.message});
    return;
  }

  res.sendStatus(500);
}