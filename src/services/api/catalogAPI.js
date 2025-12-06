// src/services/api/catalogAPI.js
import { db } from './apiproducto'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const productsCollectionRef = collection(db, 'products');

/**
 * Obtiene todos los productos desde Firestore.
 * @returns {Array} Lista de productos.
 */
export const fetchProducts = async () => {
  try {
    const data = await getDocs(productsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

/**
 * Obtiene un producto por ID desde Firestore.
 * @param {string} id
 * @returns {Object | undefined}
 */
export const getProductById = async (id) => {
  try {
    const productDocRef = doc(db, 'products', id);
    const productDoc = await getDoc(productDocRef);
    if (productDoc.exists()) {
      return { ...productDoc.data(), id: productDoc.id };
    } else {
      console.log("No se encontró el producto con ID:", id);
      return undefined;
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return undefined;
  }
};

/**
 * Agrega un nuevo producto a Firestore.
 * @param {object} productData Los datos del producto, incluyendo la URL de la imagen.
 * @returns {string} El ID del nuevo producto.
 */
export const addProduct = async (productData) => { // Ya no recibe imageFile
  console.log('addProduct: Recibiendo productData para añadir:', productData);
  try {
    const docRef = await addDoc(productsCollectionRef, productData);
    console.log('addProduct: Producto guardado en Firestore con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("addProduct: ERROR al agregar producto a Firestore:", error);
    throw error;
  }
};

/**
 * Actualiza un producto existente en Firestore.
 * @param {string} id El ID del producto a actualizar.
 * @param {object} newData Los datos a actualizar del producto, incluyendo la nueva URL de la imagen.
 */
export const updateProduct = async (id, newData) => { // Ya no recibe newImageFile ni oldImageUrl
  console.log('updateProduct: Actualizando producto con ID:', id);
  console.log('updateProduct: Nuevos datos:', newData);
  try {
    const productDocRef = doc(db, 'products', id);
    await updateDoc(productDocRef, newData);
    console.log('updateProduct: Producto actualizado exitosamente:', id);
  } catch (error) {
    console.error("updateProduct: ERROR al actualizar producto:", error);
    throw error;
  }
};

/**
 * Elimina un producto de Firestore.
 * @param {string} id
 */
export const deleteProduct = async (id) => {
  console.log('deleteProduct: Eliminando producto con ID:', id);
  try {
    const productDocRef = doc(db, 'products', id);
    await deleteDoc(productDocRef);
    console.log('deleteProduct: Producto eliminado exitosamente:', id);
  } catch (error) {
    console.error("deleteProduct: ERROR al eliminar producto:", error);
    throw error;
  }
};
