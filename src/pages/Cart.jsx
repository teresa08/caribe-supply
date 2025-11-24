import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // Simulación de ITBIS (18%)
  const total = subtotal + tax;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
              <h4>{item.name}</h4>
              <p>Precio: ${item.price.toFixed(2)}</p>
              <label>
                Cantidad:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '60px', marginLeft: '0.5rem' }}
                />
              </label>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: '1rem', color: 'red' }}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div style={{ marginTop: '2rem' }}>
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>ITBIS (18%):</strong> ${tax.toFixed(2)}</p>
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            <button
              onClick={() => navigate('/checkout')}
              style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
            >
              Proceder al Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;