import express from "express";

const router = express.Router()


router.post('/:posthash/add', function(req, res) {
  res.send('Birds home page');
});


router.delete('/:posthash/:commenthash/delete', function(req, res) {
  res.send('About birds');
});

router.get('/:posthash/get', function(req, res) {
    res.send('About birds');
  });

  router.put('/:posthash/:commenthash/update', function(req, res) {
    res.send('About birds');
  });

export default router;
