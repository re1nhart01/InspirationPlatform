import express from "express";

const router = express.Router()


router.post('/get-notifications', function(req, res) {
  res.send('Birds home page');
});

export default router;
