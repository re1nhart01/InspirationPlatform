import express from "express";

const router = express.Router()


router.post('/register', function(req, res) {
  res.send('Birds home page');
});


router.post('/login', function(req, res) {
  res.send('About birds');
});


export default router;