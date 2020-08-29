const router = require('express').Router();
const policies = require('../policies');

router.get('/protected-endpoint', policies.isAuthenticated, (req, resp) => {
  console.log(req);
  resp.json({ status: 'Yes you can access' });
});

module.exports = router;
