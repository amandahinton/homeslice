const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {      // serve React build files in production
  const path = require('path');

  router.get('/', (req, res) => {     // serve frontend index.html at root route
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));      // serve static assets in frontend build folder

  router.get(/^(?!\/?api).*/, (req, res) => {     // serve frontend index.html at routes not starting with /api
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

if (process.env.NODE_ENV !== 'production') {      // add XSRF-TOKEN cookie in development
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;
