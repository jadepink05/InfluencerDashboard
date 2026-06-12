const express = require('express');
const {
  createInfluencer,
  deleteInfluencer,
  getInfluencers,
  updateInfluencer
} = require('../controllers/influencerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getInfluencers).post(protect, createInfluencer);
router.route('/:id').put(protect, updateInfluencer).delete(protect, deleteInfluencer);

module.exports = router;
