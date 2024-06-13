import express from "express";

const router = express.Router()


router.post('/add', function(req, res) {
  res.send('Birds home page');
});


router.get('/me', function(req, res) {
  res.send('About birds');
});

router.post('/delete', function(req, res) {
    res.send('About birds');
});

router.get('/getNewsline', function(req, res) {
    res.send('About birds');
});

router.get('/getMyNewsLine', function(req, res) {
    res.send('About birds');
});

router.get('/getPost/:post-hash', function(req, res) {
    res.send('About birds');
});
