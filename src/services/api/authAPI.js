import users from '../../data/users.json';

const REGISTERED_USERS_KEY = 'caribeSupplyRegisteredUsers';

// Obtener usuarios registrados desde localStorage
const getRegisteredUsers = () => {
  const stored = localStorage.getItem(REGISTERED_USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Guardar usuarios registrados en localStorage
const saveRegisteredUsers = (usersList) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(usersList));
};

// Función de login: busca en usuarios predefinidos + registrados
export const login = (email, password) => {
  // Buscar en usuarios predefinidos (users.json)
  const predefinedUser = users.find(u => u.email === email && u.password === password);
  if (predefinedUser) {
    localStorage.setItem('caribeSupplyUser', JSON.stringify({ email: predefinedUser.email }));
    return { success: true, user: { email: predefinedUser.email } };
  }

  // Buscar en usuarios registrados
  const registeredUsers = getRegisteredUsers();
  const registeredUser = registeredUsers.find(u => u.email === email && u.password === password);
  if (registeredUser) {
    localStorage.setItem('caribeSupplyUser', JSON.stringify({ email: registeredUser.email }));
    return { success: true, user: { email: registeredUser.email } };
  }

  return { success: false, error: 'Credenciales inválidas' };
};

// Registro: agrega a la lista de usuarios registrados
export const register = (email, password) => {
  const registeredUsers = getRegisteredUsers();

  // Verificar si ya existe
  const existing = users.some(u => u.email === email) || 
                   registeredUsers.some(u => u.email === email);
  if (existing) {
    return { success: false, error: 'El correo ya está registrado' };
  }

  // Agregar nuevo usuario
  const newUser = { email, password };
  registeredUsers.push(newUser);
  saveRegisteredUsers(registeredUsers);

  // Iniciar sesión automáticamente
  localStorage.setItem('caribeSupplyUser', JSON.stringify({ email }));
  return { success: true, user: { email } };
};

export const logout = () => {
  localStorage.removeItem('caribeSupplyUser');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('caribeSupplyUser');
  return userStr ? JSON.parse(userStr) : null;
};