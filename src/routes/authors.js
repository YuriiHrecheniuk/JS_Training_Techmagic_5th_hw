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

// todo: get one post by author
router.get('/:id/posts/:postId', (req, res, next) => {
  const post = req.author.posts.find(post => post.id == req.params.postId);

  post ?
    res.json(post) :
    next(createError(500, `The user has only ${req.author.posts.length} posts.`));
})

module.exports = router;


// todo: add author
// todo: remove author
// todo: rename author
