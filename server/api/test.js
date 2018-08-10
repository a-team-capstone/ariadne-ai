const router = require('express').Router();

module.exports = router;

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Success' });
});
