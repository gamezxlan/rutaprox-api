const express = require('express');
const { getRouteEstimate } = require('../services/googleMaps.service');
const { createSession } = require('../services/session.service');
const { getSessionById } = require('../services/session.service');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        error: 'Origin y destination son requeridos'
      });
    }

    const estimate = await getRouteEstimate(origin, destination);

    const sessionId = await createSession({
    origin,
    destination,
    ...estimate
    });

    res.json({
    session_id: sessionId,
    ...estimate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error calculando la ruta'
    });
  }
});

    router.get('/:id', async (req, res) => {
    try {
        const session = await getSessionById(req.params.id);

        if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
        }

        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo sesión' });
    }
    });

module.exports = router;