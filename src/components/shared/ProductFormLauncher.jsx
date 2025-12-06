// En tu componente ProductFormLauncher o donde estés usando ProductForm
import React, { useState } from 'react';
import { Button } from '@mui/material'; // <-- ¡Añade esta línea!
import ProductForm from '../products/ProductForm'; // Asegúrate de que la ruta sea correcta
import { addProduct } from '../../services/api/catalogAPI'; // Importa addProduct

const ProductFormLauncher = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Esta función `handleSave` es la que se pasa como `onSave` al ProductForm
  const handleSave = async (productData, imageFile) => { // ¡Ahora recibe imageFile!
    try {
      // Llama a la función addProduct que ya espera el archivo de imagen
      const productId = await addProduct(productData, imageFile);
      console.log("Producto añadido con ID:", productId);
      // Dispara un evento para que el Catalog sepa que debe recargar los productos
      window.dispatchEvent(new Event('products-updated'));
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Aquí podrías añadir una notificación de error para el usuario
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Registrar Nuevo Producto
      </Button>
      <ProductForm
        open={open}
        onClose={handleClose}
        onSave={handleSave} // Aquí es donde se pasa la función handleSave
      />
    </>
  );
};

export default ProductFormLauncher;
