import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

// Configuración temporal para desarrollo - En producción usar variables de entorno
const SUPABASE_URL = "https://ykoyxhuxsltscrycdeka.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrb3l4aHV4c2x0c2NyeWNkZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMDcyNDksImV4cCI6MjAzOTY4MzI0OX0.demo-key-for-fifa-2026";

// Cliente Supabase para autenticación y base de datos
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Funciones de autenticación
export const authService = {
  // Registro de usuario
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error('Error en registro:', error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Error inesperado en registro:', error);
      return { success: false, error: 'Error de conexión' };
    }
  },

  // Inicio de sesión
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Error en login:', error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Error inesperado en login:', error);
      return { success: false, error: 'Error de conexión' };
    }
  },

  // Cerrar sesión
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error cerrando sesión:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error('Error inesperado cerrando sesión:', error);
      return { success: false, error: 'Error de conexión' };
    }
  },

  // Obtener sesión actual
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error obteniendo sesión:', error.message);
        return { success: false, session: null };
      }
      return { success: true, session };
    } catch (error) {
      console.error('Error inesperado obteniendo sesión:', error);
      return { success: false, session: null };
    }
  },

  // Mock para desarrollo offline
  async mockSignIn(email: string, password: string) {
    // Simulación de autenticación para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ 
            success: true, 
            user: { 
              id: 'mock-user-id', 
              email, 
              created_at: new Date().toISOString() 
            } 
          });
        } else {
          resolve({ success: false, error: 'Email y contraseña requeridos' });
        }
      }, 1000); // Simular delay de red
    });
  }
};

// Export por defecto requerido por Expo Router
export default function SupabaseClient() {
  return null;
}
