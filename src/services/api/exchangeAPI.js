export const fetchExchangeRates = async () => {
  const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await res.json();
  return {
    DOP: data.rates.DOP || 58.5,
    EUR: data.rates.EUR || 0.93,
  };
};