const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const estimateRoutes = require('./routes/estimate.routes');
const simulatorRoutes = require('./routes/simulator.routes');

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/estimate', estimateRoutes);
app.use('/api/simulator', simulatorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚕 Rutaprox backend corriendo en puerto ${PORT}`);
});