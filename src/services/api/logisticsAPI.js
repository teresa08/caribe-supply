// Simulación
export const getTrackingInfo = (trackingId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'En tránsito',
        location: 'Centro de distribución, Santo Domingo',
        estimatedDelivery: '2025-11-30',
      });
    }, 500);
  });
};