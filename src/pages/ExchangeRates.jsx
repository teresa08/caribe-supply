import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../services/api/exchangeAPI';

const ExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRates()
      .then(setRates)
      .catch(() => setRates({ DOP: 58.5, EUR: 0.93 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tasas de Cambio</h2>
      <p>Actualizadas desde API (USD base)</p>
      {loading ? (
        <p>Cargando tasas...</p>
      ) : (
        <div>
          <p><strong>1 USD = {rates.DOP.toFixed(2)} DOP</strong></p>
          <p><strong>1 USD = {rates.EUR.toFixed(2)} EUR</strong></p>
        </div>
      )}
    </div>
  );
};

export default ExchangeRates;