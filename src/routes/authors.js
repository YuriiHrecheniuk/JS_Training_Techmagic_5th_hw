const express = require('express');
const router = express.Router();

const createError = require('http-errors');

const authors = [
  {
    id: 1,
    name: 'Yurii',
    posts: [
      {id: 1, text: 'Hello World!'},
      {id: 2, text: 'I love programming!'}
    ]
  },
  {
    id: 2,
    name: 'Nadia',
    posts: [
      {id: 1, text: 'I love medicine!'}
    ]
  },
  {
    id: 3,
    name: 'Kyrylo',
    posts: [
      {id: 1, text: 'I am Yurii`s brother!'},
      {id: 2, text: 'I love mountains!'}
    ]
  }
]

router.get('/', (req, res) => {
  res.json(authors);
})

router.param('id', (req, res, next, id) => {
  const author = authors.find(author => author.id == id);

  if (!author) {
    next(createError(500, 'There is no such author.'));
    return;
  }

  req.author = author;
  next();
})

router.get('/:id/posts', (req, res, next) => {
  res.json(req.author.posts);
})

router.get('/:id/posts/:postId', (req, res, next) => {
  const post = req.author.posts.find(post => post.id == req.params.postId);

  post ?
    res.json(post) :
    next(createError(500, `The user has only ${req.author.posts.length} post(-s).`));
})

router.post('/', (req, res, next) => {
  if (!req.body.name) {
    next(createError(400, 'Name is required.'));
    return;
  }

  authors.push({
    id: authors.length + 1,
    name: req.body.name,
    posts: []
  });

  res.send('Author added successfully.');
})

router.delete('/:id', (req, res) => {
  const authorIndex = authors.findIndex(author => author.id == req.params.id);

  authors.splice(authorIndex, 1);
  res.send(`Author ${req.author.name} with id ${req.params.id} deleted.`);
})

router.put('/:id', (req, res, next) => {
  if (!req.body.newName) {
    next(createError(400, 'New name is required.'));
    return;
  }

  const oldName = req.author.name;

  req.author.name = req.body.newName;
  res.send(`Author ${oldName} with id ${req.author.id} is now ${req.body.newName}.`);
})

module.exports = router;
