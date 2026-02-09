const axios = require('axios');
const pricing = require('../config/pricing');

const GOOGLE_MAPS_URL =
  'https://maps.googleapis.com/maps/api/directions/json';

const getRouteEstimate = async (origin, destination) => {
  const params = {
    origin: `${origin.lat},${origin.lng}`,
    destination,
    departure_time: 'now',
    alternatives: true,
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const response = await axios.get(GOOGLE_MAPS_URL, { params });

  if (!response.data.routes.length) {
    throw new Error('No se encontraron rutas');
  }

  const routes = response.data.routes;

  let totalDistance = 0;
  let totalDuration = 0;
  let totalDurationTraffic = 0;

  routes.forEach(route => {
    const leg = route.legs[0];
    totalDistance += leg.distance.value;
    totalDuration += leg.duration.value;
    totalDurationTraffic +=
      leg.duration_in_traffic?.value || leg.duration.value;
  });

    const costEstimate =
    pricing.baseFare +
    pricing.pricePerKm *
        ((totalDistance / routes.length) / 1000);

    return {
    routes_count: routes.length,
    average_distance_km: Number(
        ((totalDistance / routes.length) / 1000).toFixed(2)
    ),
    average_duration_min: Number(
        ((totalDuration / routes.length) / 60).toFixed(1)
    ),
    average_duration_with_traffic_min: Number(
        ((totalDurationTraffic / routes.length) / 60).toFixed(1)
    ),
    base_fare: pricing.baseFare,
    price_per_km: pricing.pricePerKm,
    estimated_cost: Number(costEstimate.toFixed(2)),
    main_route_id: routes[0].overview_polyline.points
    };
};

module.exports = {
  getRouteEstimate
};