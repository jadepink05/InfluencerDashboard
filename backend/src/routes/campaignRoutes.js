const express = require('express');
const {
  createCampaign,
  deleteCampaign,
  getCampaigns,
  updateCampaign
} = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getCampaigns).post(protect, createCampaign);
router.route('/:id').put(protect, updateCampaign).delete(protect, deleteCampaign);

module.exports = router;
