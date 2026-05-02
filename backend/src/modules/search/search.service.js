const { pool } = require('../../config/db');

class SearchService {
  async search(query) {
    const searchTerm = `%${query}%`;
    const result = await pool.query(
      `SELECT id, full_name, email, role, department, designation, profile_pic 
       FROM users 
       WHERE full_name ILIKE $1 OR email ILIKE $1 OR department ILIKE $1 OR designation ILIKE $1
       LIMIT 10`,
      [searchTerm]
    );
    return result.rows.map(row => ({
      ...row,
      type: 'user'
    }));
  }
}

module.exports = new SearchService();
