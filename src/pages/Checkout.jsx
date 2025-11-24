import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { validateEmail, validatePhone, validateNotEmpty } from '../utils/validators';

const Checkout = () => {
  const { cart, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    province: 'Santo Domingo',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateNotEmpty(formData.name)) newErrors.name = 'El nombre es obligatorio.';
    if (!validateEmail(formData.email)) newErrors.email = 'Correo inválido.';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Teléfono inválido (10 dígitos).';
    if (!validateNotEmpty(formData.address)) newErrors.address = 'La dirección es obligatoria.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulación de procesamiento
      setTimeout(() => {
        alert('¡Compra simulada exitosa! Gracias por tu pedido.');
        clearCart();
        navigate('/');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Finalizar Compra</h2>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Resumen del pedido */}
        <div style={{ flex: 1 }}>
          <h3>Resumen</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '0.5rem' }}>
              <span>{item.name} × {item.quantity}</span> – ${ (item.price * item.quantity).toFixed(2) }
            </div>
          ))}
          <hr />
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>ITBIS (18%):</strong> ${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>

        {/* Formulario */}
        <div style={{ flex: 2 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name">Nombre completo *</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem' }}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" style={{ color: 'red', fontSize: '0.9rem' }}>{errors.name}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">Correo electrónico *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem' }}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="phone">Teléfono (10 dígitos) *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem' }}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <span id="phone-error" style={{ color: 'red', fontSize: '0.9rem' }}>{errors.phone}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="address">Dirección completa *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%', padding: '0.5rem' }}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <span id="address-error" style={{ color: 'red', fontSize: '0.9rem' }}>{errors.address}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="province">Provincia *</label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option>Santo Domingo</option>
                <option>Santiago</option>
                <option>La Vega</option>
                <option>Duarte</option>
                <option>San Pedro de Macorís</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isSubmitting ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;