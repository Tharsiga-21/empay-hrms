const express = require('express');
const router = express.Router();
const notificationsController = require('./notifications.controller');
const authMiddleware = require('../../middleware/auth');

router.use(authMiddleware);

// GET /api/notifications
router.get('/', notificationsController.getAll);

// PUT /api/notifications/:id/read
router.put('/:id/read', notificationsController.markAsRead);

// PUT /api/notifications/read-all
router.put('/read-all', notificationsController.markAllAsRead);

module.exports = router;
