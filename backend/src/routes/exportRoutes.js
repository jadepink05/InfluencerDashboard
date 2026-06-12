const express = require('express');
const { exportCsv } = require('../controllers/exportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, exportCsv);

module.exports = router;
