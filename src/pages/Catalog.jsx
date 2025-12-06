// src/pages/Catalog.js
import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/api/catalogAPI';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/shared/ProductCard';
import ProductForm from '../components/products/ProductForm';
import { Button } from '@mui/material'; // Mantén esta importación

/** Componente principal del catálogo de productos. */
const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useContext(AppContext);

  // Función para obtener los productos y actualizar el estado
  const getAndSetProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAndSetProducts(); // Carga inicial de productos

    // Escuchador de eventos para refrescar la lista
    // Esta es una alternativa al "refresh" que comentas
    const onProductsUpdated = () => {
      getAndSetProducts();
    };
    window.addEventListener('products-updated', onProductsUpdated);

    return () => window.removeEventListener('products-updated', onProductsUpdated);
  }, []);

  /** Abre el formulario para añadir un producto. */
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  /** Abre el formulario para editar un producto existente. */
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  /** Cierra el formulario de productos. */
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingProduct(null);
  };

  /** Guarda un producto (añade o actualiza). */
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      handleCloseForm();
      // Ya no necesitamos window.dispatchEvent aquí porque getAndSetProducts se llamará internamente
      getAndSetProducts(); // Refresca la lista inmediatamente después de guardar
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  /** Elimina un producto. */
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        // Ya no necesitamos window.dispatchEvent aquí
        getAndSetProducts(); // Refresca la lista inmediatamente después de eliminar
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Nuestros Productos</h2>
      {/* Botón para lanzar el formulario de añadir */}
      <Button variant="contained" onClick={handleOpenAddForm} sx={{ mb: 2 }}>
        Registrar Nuevo Producto
      </Button>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      <ProductForm
        open={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />
    </div>
  );
};

export default Catalog;
