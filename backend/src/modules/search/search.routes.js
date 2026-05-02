const express = require('express');
const router = express.Router();
const searchController = require('./search.controller');
const authMiddleware = require('../../middleware/auth');

// GET /api/search
router.get('/', authMiddleware, searchController.search);

module.exports = router;
