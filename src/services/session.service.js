const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createSession = async (data) => {
  const id = uuidv4();

  const query = `
    INSERT INTO route_sessions (
      id,
      origin_lat,
      origin_lng,
      destination,
      average_distance_km,
      average_duration_min,
      average_duration_with_traffic_min,
      base_fare,
      price_per_km,
      estimated_cost
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
  `;

  const values = [
    id,
    data.origin.lat,
    data.origin.lng,
    data.destination,
    data.average_distance_km,
    data.average_duration_min,
    data.average_duration_with_traffic_min,
    data.base_fare,
    data.price_per_km,
    data.estimated_cost
  ];

  await pool.query(query, values);

  return id;
};

const getSessionById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM route_sessions WHERE id = $1',
    [id]
  );
  return rows[0];
};

module.exports = {
  createSession,
  getSessionById
};