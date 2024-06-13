import express from "express";

const router = express.Router()


router.get('/', function(req, res) {
  res.send('Birds home page');
});


router.get('/about', function(req, res) {
  res.send('About birds');
});