const router = require('express').Router();
let Quote = require('../models/quotes');


router.get('/', (req, res) => {
  Quote.find()
  .then(quotes => res.json(quotes))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/add', (req, res) => {
  const username = req.body.username;
  const author = req.body.author;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newQuote = new Quote({
    username,
    author,
    description,
    date
  })

  newQuote.save()
  .then(() => res.json('New Quote added'))
  .catch(err => res.status(400).json(`Error: ${err}`))
})


router.get('/:id', (req, res) => {
  Quote.findById(req.params.id)
  .then(quote => res.json(quote))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/update/:id', (req, res) => {
  Quote.findById(req.params.id)
  .then(quote => {
    quote.username = req.body.username;
    quote.author = req.body.author;
    quote.description = req.body.description;
    quote.date = Date.parse(req.body.date);

    quote.save()
    .then(() => res.redirect('/'))
    .catch(err => res.status(400).json(`Error: ${err}`))
  })
  .catch(err => res.status(400).json(`Error: ${err}`))
})


router.delete('/:id', (req, res) => {
  Quote.findByIdAndDelete(req.params.id)
  .then(() => res.json('Quote deleted'))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;