const notificationsService = require('./notifications.service');

const getAll = async (req, res) => {
  try {
    const notifications = await notificationsService.getAll(req.user.id);
    res.json({ success: true, message: 'Notifications fetched', data: notifications });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await notificationsService.markAsRead(req.params.id, req.user.id);
    res.json({ success: true, message: 'Notification marked as read', data: notification });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await notificationsService.markAllAsRead(req.user.id);
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

module.exports = { getAll, markAsRead, markAllAsRead };
