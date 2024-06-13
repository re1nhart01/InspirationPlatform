import express from "express";

const router = express.Router()


router.get('/me', function(req, res) {
  res.send('Birds home page');
});


router.get('/check', function(req, res) {
  res.send('About birds');
});

router.get('/logout', function (req, res) {
  res.send('About birds');
})

router.get('/:userId', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/subscribe', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/unfollow', function (req, res) {
    res.send('About birds');
})

router.post('/:userId/acceptRequest', function (req, res) {
    res.send('About birds');
})

router.post('/requestList', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/following', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/followers', function (req, res) {
    res.send('About birds');
})