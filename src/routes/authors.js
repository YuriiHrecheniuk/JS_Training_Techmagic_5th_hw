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

router.get('/:id', (req, res, next) => {
  const author = authors.find(author => author.id == req.params.id);

  author ?
    res.json(author) :
    next(createError(500, 'There is no such author.'));
})

module.exports = router;


// todo: add author
// todo: remove author
// todo: rename author
// todo: get posts by author
// todo: get one post by author