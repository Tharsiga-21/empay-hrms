const { Pool } = require('pg');

const testPass = async (pw) => {
  try {
    const p = new Pool({ connectionString: `postgresql://postgres:${pw}@localhost:5432/postgres` });
    await p.connect();
    console.log('SUCCESS with password:', pw);
    process.exit(0);
  } catch(e) {
    // console.log(`FAILED with ${pw}`);
  }
};

(async () => {
  await testPass('postgres');
  await testPass('admin');
  await testPass('root');
  await testPass('');
  await testPass('admin123');
  await testPass('1234');
  console.log('ALL FAILED');
  process.exit(1);
})();
