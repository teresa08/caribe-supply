import React, { useState, useEffect } from 'react';
import { fetchWeatherByProvince } from '../services/api/weatherAPI';
import { coordinates } from '../data/coordinates';

const Weather = () => {
  const [province, setProvince] = useState('Santo Domingo');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWeather();
  }, [province]);

  const loadWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherByProvince(province);
      setWeather(data.current_weather); // <- AQUÍ EL FIX
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const weatherDescriptions = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    71: "Nieve ligera",
    73: "Nieve moderada",
    75: "Nieve intensa",
    80: "Aguaceros ligeros",
    81: "Aguaceros moderados",
    82: "Aguaceros fuertes",
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Clima por Provincia</h2>

      <select value={province} onChange={(e) => setProvince(e.target.value)}>
        {Object.keys(coordinates).map((prov) => (
          <option key={prov}>{prov}</option>
        ))}
      </select>

      {loading && <p>Cargando...</p>}

      {!loading && weather && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' }}>
          <h3>{province}</h3>
          <p><strong>Descripción:</strong> {weatherDescriptions[weather.weathercode] || "Desconocido"}</p>
          <p><strong>Temperatura:</strong> {weather.temperature}°C</p>
          <p><strong>Viento:</strong> {weather.windspeed} km/h</p>
          <p><strong>Dirección del viento:</strong> {weather.winddirection}°</p>
          <p><strong>Fecha:</strong> {weather.time}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
