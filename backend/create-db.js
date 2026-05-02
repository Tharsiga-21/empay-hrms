const { Pool } = require('pg');

const initDB = async () => {
  const p = new Pool({ connectionString: 'postgresql://postgres:root@localhost:5432/postgres' });
  try {
    await p.connect();
    const res = await p.query("SELECT 1 FROM pg_database WHERE datname = 'empay_db'");
    if (res.rowCount === 0) {
      console.log('Database does not exist. Creating empay_db...');
      await p.query('CREATE DATABASE empay_db');
      console.log('Database created.');
    } else {
      console.log('Database already exists.');
    }
  } catch(e) {
    console.error('Error:', e);
  } finally {
    await p.end();
  }
};

initDB();
