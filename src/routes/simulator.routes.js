const express = require('express');
const {
  startSimulation,
  finishSimulation,
  getSession
} = require('../services/simulator.service');

const router = express.Router();

router.post('/:id/start', async (req, res) => {
  await startSimulation(req.params.id);
  res.json({ status: 'started' });
});

router.post('/:id/finish', async (req, res) => {
  await finishSimulation(req.params.id);
  res.json({ status: 'finished' });
});

router.get('/:id', async (req, res) => {
  const session = await getSession(req.params.id);
  res.json(session);
});

module.exports = router;