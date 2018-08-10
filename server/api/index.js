const router = require('express').Router();
module.exports = router;

// router.use('/users', require('./users'))
router.use('/test', require('./test'));
router.use('/uploads', require('./uploads'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
