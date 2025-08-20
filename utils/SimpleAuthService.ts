// Sistema de autenticación simple con usuarios predefinidos
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
}

// Base de datos de usuarios predefinidos
const USERS_DATABASE: User[] = [
  {
    id: 'admin-001',
    email: 'admin@fifa2026.com',
    password: 'fifa2026',
    name: 'Administrador FIFA',
    role: 'admin',
    created_at: '2025-08-20T00:00:00.000Z'
  },
  {
    id: 'user-001',
    email: 'alex@fifa2026.com',
    password: 'alex123',
    name: 'Alex Mundial',
    role: 'user',
    created_at: '2025-08-20T00:00:00.000Z'
  },
  {
    id: 'user-002',
    email: 'fifa@mundial.com',
    password: 'mundial2026',
    name: 'Usuario FIFA',
    role: 'user',
    created_at: '2025-08-20T00:00:00.000Z'
  },
  {
    id: 'user-003',
    email: 'demo@test.com',
    password: 'demo123',
    name: 'Usuario Demo',
    role: 'user',
    created_at: '2025-08-20T00:00:00.000Z'
  },
  {
    id: 'guest-001',
    email: 'invitado@fifa.com',
    password: '123456',
    name: 'Usuario Invitado',
    role: 'user',
    created_at: '2025-08-20T00:00:00.000Z'
  }
];

export const SimpleAuthService = {
  // Iniciar sesión
  async signIn(email: string, password: string) {
    return new Promise<{ success: boolean; user?: User; error?: string }>((resolve) => {
      setTimeout(() => {
        // Buscar usuario en la base de datos
        const user = USERS_DATABASE.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          // Login exitoso
          const userResponse = { ...user };
          delete (userResponse as any).password; // No devolver la contraseña
          
          resolve({
            success: true,
            user: userResponse
          });
        } else {
          // Credenciales incorrectas
          resolve({
            success: false,
            error: 'Email o contraseña incorrectos'
          });
        }
      }, 800); // Simular delay de red
    });
  },

  // Registrar nuevo usuario (mock - en realidad no se guarda)
  async signUp(email: string, password: string, name: string) {
    return new Promise<{ success: boolean; user?: User; error?: string }>((resolve) => {
      setTimeout(() => {
        // Verificar si el email ya existe
        const existingUser = USERS_DATABASE.find(
          u => u.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
          resolve({
            success: false,
            error: 'El email ya está registrado'
          });
          return;
        }

        // Crear nuevo usuario (mock)
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          password,
          name,
          role: 'user',
          created_at: new Date().toISOString()
        };

        const userResponse = { ...newUser };
        delete (userResponse as any).password;

        resolve({
          success: true,
          user: userResponse
        });
      }, 1000);
    });
  },

  // Obtener información de usuarios disponibles (para demo)
  getAvailableUsers() {
    return USERS_DATABASE.map(user => ({
      email: user.email,
      name: user.name,
      role: user.role,
      // No mostrar contraseñas en producción, solo para demo
      hint: `Contraseña: ${user.password}`
    }));
  },

  // Cerrar sesión
  async signOut() {
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  }
};
