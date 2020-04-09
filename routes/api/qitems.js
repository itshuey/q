// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const QItem = require('../../models/QItem');

// @route GET api/qitems/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('qitem route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  QItem.find()
    .then(qitems => res.json(qitems))
    .catch(err => res.status(404).json({ noqitemsfound: 'No Queue Items found' }));
});

// @route GET api/qitems/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  QItem.findById(req.params.id)
    .then(qitem => res.json(qitem))
    .catch(err => res.status(404).json({ noqitemfound: 'No Queue Item found' }));
});

// @route GET api/qitems
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  QItem.create(req.body)
    .then(qitem => res.json({ msg: 'Queue Item added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Queue Item' }));
});

// @route GET api/qitems/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  QItem.findByIdAndUpdate(req.params.id, req.body)
    .then(qitem => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/qitems/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  QItem.findByIdAndRemove(req.params.id, req.body)
    .then(qitem => res.json({ mgs: 'Queue Item entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such queue item' }));
});

module.exports = router;