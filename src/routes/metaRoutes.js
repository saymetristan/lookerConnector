const express = require('express');
const router = express.Router();
const { getMetaData } = require('../controllers/metaController');

router.get('/meta-data', getMetaData);

module.exports = router;
