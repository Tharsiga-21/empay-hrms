const { pool } = require('../../config/db');

class NotificationsService {
  async getAll(userId) {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [userId]
    );
    return result.rows;
  }

  async create(userId, title, message, type = 'info') {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, title, message, type]
    );
    return result.rows[0];
  }

  async markAsRead(notificationId, userId) {
    const result = await pool.query(
      `UPDATE notifications SET is_read = true 
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [notificationId, userId]
    );
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Notification not found' };
    }
    return result.rows[0];
  }

  async markAllAsRead(userId) {
    await pool.query(
      `UPDATE notifications SET is_read = true WHERE user_id = $1`,
      [userId]
    );
  }
}

module.exports = new NotificationsService();
