
import React, { useState } from 'react';
import { getTrackingInfo } from '../services/api/logisticsAPI';

const Logistics = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const info = await getTrackingInfo(trackingId);
    setTrackingInfo(info);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Seguimiento Logístico</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Ingresa tu código de seguimiento (ej: CS12345)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '250px' }}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Buscando paquete...</p>}
      {trackingInfo && (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
          <h3>Estado: {trackingInfo.status}</h3>
          <p>📍 Última ubicación: {trackingInfo.location}</p>
          <p>📅 Entrega estimada: {trackingInfo.estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
};

export default Logistics;