
export const validateNotEmpty = (value) => value.trim() !== '';

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 && /^\d+$/.test(cleaned);
};

export const validateAddress = (address) => {
  return address.trim().length >= 10;
};