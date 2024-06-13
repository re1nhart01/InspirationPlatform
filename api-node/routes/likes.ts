import express from "express";

const router = express.Router()


router.get('/:postowner/:posthash/like', function(req, res) {
  res.send('Birds home page');
});


router.get('/getLikes/:posthash', function(req, res) {
  res.send('About birds');
});