const pool = require('../config/db');

const startSimulation = async (sessionId) => {
  await pool.query(
    `
    UPDATE route_sessions
    SET started_at = NOW()
    WHERE id = $1 AND started_at IS NULL
    `,
    [sessionId]
  );
};

const finishSimulation = async (sessionId) => {
  await pool.query(
    `
    UPDATE route_sessions
    SET finished_at = NOW()
    WHERE id = $1
    `,
    [sessionId]
  );
};

const getSession = async (sessionId) => {
  const { rows } = await pool.query(
    'SELECT * FROM route_sessions WHERE id = $1',
    [sessionId]
  );
  return rows[0];
};

module.exports = {
  startSimulation,
  finishSimulation,
  getSession
};