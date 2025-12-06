import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Input
} from '@mui/material';

/** Formulario para añadir o editar productos. */
export default function ProductForm({ open, onClose, onSave, initialProduct = null }) {
  // Inicialización del estado 'product' usando una función para que se ejecute solo una vez
  const [product, setProduct] = useState(() => {
    if (initialProduct) {
      return {
        name: initialProduct.name || '',
        price: initialProduct.price || '',
        category: initialProduct.category || '',
        description: initialProduct.description || '',
        image: initialProduct.image || ''
      };
    }
    return { name: '', price: '', category: '', description: '', image: '' };
  });

  const [localImageFile, setLocalImageFile] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState('');

  // Usamos un useEffect solo para RESETEAR el formulario cuando se abre o se cambia de producto.
  // Es importante que el reset NO use setProduct directamente si el formulario ya está abierto.
  useEffect(() => {
    if (open) { // Solo resetear si el diálogo se acaba de abrir o si el producto inicial ha cambiado
      if (initialProduct) {
        setProduct({
          name: initialProduct.name || '',
          price: initialProduct.price || '',
          category: initialProduct.category || '',
          description: initialProduct.description || '',
          image: initialProduct.image || ''
        });
      } else {
        setProduct({ name: '', price: '', category: '', description: '', image: '' });
      }
      setLocalImageFile(null);
      setLocalImageUrl('');
    }
  }, [initialProduct, open]); // Depende de initialProduct y open

  // Limpiar la URL de objeto cuando el componente se desmonte o la URL cambie
  useEffect(() => {
    return () => {
      if (localImageUrl) {
        URL.revokeObjectURL(localImageUrl);
      }
    };
  }, [localImageUrl]);


  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalImageFile(file);
      // Revocar URL anterior si existe para evitar fugas
      if (localImageUrl) {
        URL.revokeObjectURL(localImageUrl);
      }
      setLocalImageUrl(URL.createObjectURL(file));
    } else {
      setLocalImageFile(null);
      if (localImageUrl) {
        URL.revokeObjectURL(localImageUrl);
      }
      setLocalImageUrl('');
    }
  };

  const handleSubmit = () => {
    if (!product.name) {
      console.warn('El nombre del producto es obligatorio.');
      return;
    }
    onSave({ ...product, price: Number(product.price) || 0 });
    onClose();
  };

  const dialogTitle = initialProduct ? 'Editar Producto' : 'Registrar Nuevo Producto';

  const previewImage = localImageUrl || product.image || 'https://via.placeholder.com/100';

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Nombre" fullWidth margin="dense" value={product.name} onChange={handleChange} />
        <TextField name="price" label="Precio" type="number" fullWidth margin="dense" value={product.price} onChange={handleChange} />

        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
          <img src={previewImage} alt="Previsualización" style={{ maxWidth: '150px', maxHeight: '150px', border: '1px solid #ccc' }} />
        </div>

        <Button
          variant="contained"
          component="label"
          sx={{ mt: 1, mb: 1 }}
        >
          Seleccionar Imagen Local
          <Input
            type="file"
            name="imageFile"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            // Importante: resetear el input si se selecciona el mismo archivo de nuevo
            // Para asegurar que onChange se dispara incluso si se elige el mismo archivo.
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </Button>
        {localImageFile && (
          <p style={{ fontSize: '0.85rem', color: 'gray' }}>Archivo seleccionado: {localImageFile.name}</p>
        )}

        <TextField name="image" label="Imagen (URL Pública)" fullWidth margin="dense" value={product.image} onChange={handleChange} />
        <p style={{ fontSize: '0.75rem', color: 'gray' }}>Puedes subir una imagen local o proporcionar una URL pública.
        </p>

        <TextField name="category" label="Categoría" fullWidth margin="dense" value={product.category} onChange={handleChange} />
        <TextField name="description" label="Descripción" fullWidth margin="dense" multiline rows={2} value={product.description} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}