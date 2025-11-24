import { coordinates } from "../../data/coordinates";

export const fetchWeatherByProvince = async (province) => {
  const { lat, lon } = coordinates[province];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al obtener el clima");
  }

  return await res.json();
};
