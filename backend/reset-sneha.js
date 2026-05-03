const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function reset() {
  const hash = await bcrypt.hash('Password@123', 10);
  console.log('New hash:', hash);
  await pool.query("UPDATE users SET password_hash = $1 WHERE email = 'sneha@empay.com'", [hash]);
  console.log('Update done');
  process.exit(0);
}

reset();
