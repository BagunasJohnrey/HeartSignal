const express = require('express');
const router = express.Router();
const { sendSignal, getReceivedSignals } = require('../controllers/signalController');

router.post('/send', sendSignal);
router.get('/received/:userId', getReceivedSignals);

module.exports = router;
