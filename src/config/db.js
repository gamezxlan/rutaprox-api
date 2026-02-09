require('dotenv').config();
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL no está definido');
}

const isRailway = process.env.DATABASE_URL.includes('railway');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRailway
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;