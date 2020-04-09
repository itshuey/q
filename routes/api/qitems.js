const express = require('express');
const router = express.Router();

// Load QItem model
const QItem = require('../../models/QItem');

// @route GET api/qitems/test
// @description tests qitems route
// @access Public
router.get('/test', (req, res) => res.send('qitem route testing!'));

// @route GET api/qitems
// @description Get all qitems
// @access Public
router.get('/', (req, res) => {
  QItem.find()
    .then(qitems => res.json(qitems))
    .catch(err => res.status(404).json({ noqitemsfound: 'No Queue Items found' }));
});

// @route GET api/qitems/:id
// @description Get single qitem by id
// @access Public
router.get('/:id', (req, res) => {
  QItem.findById(req.params.id)
    .then(qitem => res.json(qitem))
    .catch(err => res.status(404).json({ noqitemfound: 'No Queue Item found' }));
});

// @route GET api/qitems
// @description add/save qitem
// @access Public
router.post('/', (req, res) => {
  QItem.create(req.body)
    .then(qitem => res.json({ msg: 'Queue Item added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Queue Item' }));
});

// @route GET api/qitems/:id
// @description Update qitem
// @access Public
router.put('/:id', (req, res) => {
  QItem.findByIdAndUpdate(req.params.id, req.body)
    .then(qitem => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/qitems/:id
// @description Delete qitem by id
// @access Public
router.delete('/:id', (req, res) => {
  QItem.findByIdAndRemove(req.params.id, req.body)
    .then(qitem => res.json({ mgs: 'Queue Item entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such queue item' }));
});

module.exports = router;