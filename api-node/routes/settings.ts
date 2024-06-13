import express from "express";

const router = express.Router()


router.post('/avatar', function(req, res) {
  res.send('Birds home page');
});


router.post('/:parameter', function(req, res) {
  res.send('About birds');
});