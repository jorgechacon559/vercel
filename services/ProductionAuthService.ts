import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, AuthError } from '@supabase/supabase-js';

// ⚠️ CONFIGURACIÓN - CAMBIAR POR TUS CREDENCIALES REALES
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://tu-proyecto.supabase.co";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "tu-anon-key";

// Cliente Supabase configurado para producción
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tipos para el sistema de autenticación
export interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string;
  user_metadata?: any;
  app_metadata?: any;
  created_at: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  needsEmailConfirmation?: boolean;
}

// Validaciones de seguridad
export const ValidationUtils = {
  // Validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar contraseña segura
  isValidPassword(password: string): { valid: boolean; message: string } {
    if (password.length < 8) {
      return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'La contraseña debe contener al menos una letra minúscula' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'La contraseña debe contener al menos una letra mayúscula' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'La contraseña debe contener al menos un número' };
    }
    return { valid: true, message: 'Contraseña válida' };
  },

  // Validar que las contraseñas coincidan
  passwordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
};

// Servicio de autenticación robusto para producción
export const ProductionAuthService = {
  // ========== REGISTRO DE USUARIO ==========
  async signUp(email: string, password: string, fullName?: string): Promise<AuthResult> {
    try {
      // Validaciones previas
      if (!ValidationUtils.isValidEmail(email)) {
        return { success: false, error: 'Por favor ingresa un email válido' };
      }

      const passwordValidation = ValidationUtils.isValidPassword(password);
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.message };
      }

      // Registro en Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            full_name: fullName || '',
            app_name: 'FIFA Mundial 2026'
          }
        }
      });

      if (error) {
        console.error('Error en registro:', error);
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      if (data.user && !data.user.email_confirmed_at) {
        return {
          success: true,
          user: data.user as AuthUser,
          needsEmailConfirmation: true
        };
      }

      return {
        success: true,
        user: data.user as AuthUser
      };

    } catch (error) {
      console.error('Error inesperado en registro:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu internet e intenta nuevamente.' 
      };
    }
  },

  // ========== INICIO DE SESIÓN ==========
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      // Validaciones previas
      if (!email || !password) {
        return { success: false, error: 'Email y contraseña son requeridos' };
      }

      if (!ValidationUtils.isValidEmail(email)) {
        return { success: false, error: 'Por favor ingresa un email válido' };
      }

      // Login en Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      });

      if (error) {
        console.error('Error en login:', error);
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      if (!data.user?.email_confirmed_at) {
        return {
          success: false,
          error: 'Por favor confirma tu email antes de iniciar sesión',
          needsEmailConfirmation: true
        };
      }

      return {
        success: true,
        user: data.user as AuthUser
      };

    } catch (error) {
      console.error('Error inesperado en login:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu internet e intenta nuevamente.' 
      };
    }
  },

  // ========== REENVIAR CONFIRMACIÓN DE EMAIL ==========
  async resendEmailConfirmation(email: string): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.toLowerCase().trim()
      });

      if (error) {
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Error reenviando confirmación:', error);
      return { 
        success: false, 
        error: 'Error al reenviar confirmación' 
      };
    }
  },

  // ========== RECUPERACIÓN DE CONTRASEÑA ==========
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      if (!ValidationUtils.isValidEmail(email)) {
        return { success: false, error: 'Por favor ingresa un email válido' };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.toLowerCase().trim(),
        {
          redirectTo: 'http://localhost:8081/reset-password', // Temporal para desarrollo
        }
      );

      if (error) {
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Error en reset password:', error);
      return { 
        success: false, 
        error: 'Error al enviar email de recuperación' 
      };
    }
  },

  // ========== CERRAR SESIÓN ==========
  async signOut(): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      return { 
        success: false, 
        error: 'Error al cerrar sesión' 
      };
    }
  },

  // ========== OBTENER SESIÓN ACTUAL ==========
  async getCurrentSession(): Promise<AuthResult> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        return { 
          success: false, 
          error: this.getHumanReadableError(error) 
        };
      }

      if (session?.user) {
        return {
          success: true,
          user: session.user as AuthUser
        };
      }

      return { success: false, error: 'No hay sesión activa' };
    } catch (error) {
      console.error('Error obteniendo sesión:', error);
      return { 
        success: false, 
        error: 'Error al verificar sesión' 
      };
    }
  },

  // ========== OBTENER USUARIO ACTUAL ==========
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user as AuthUser | null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  },

  // ========== LISTENER DE CAMBIOS DE AUTENTICACIÓN ==========
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // ========== CONVERTIR ERRORES A MENSAJES LEGIBLES ==========
  getHumanReadableError(error: AuthError | Error): string {
    const message = error.message.toLowerCase();

    if (message.includes('email not confirmed')) {
      return 'Por favor confirma tu email antes de continuar';
    }
    if (message.includes('invalid login credentials')) {
      return 'Email o contraseña incorrectos';
    }
    if (message.includes('user already registered')) {
      return 'Este email ya está registrado';
    }
    if (message.includes('password is too weak')) {
      return 'La contraseña es muy débil. Debe tener al menos 8 caracteres';
    }
    if (message.includes('rate limit')) {
      return 'Demasiados intentos. Espera unos minutos antes de intentar nuevamente';
    }
    if (message.includes('network')) {
      return 'Error de conexión. Verifica tu internet';
    }

    // Error genérico
    return error.message || 'Ha ocurrido un error inesperado';
  }
};

// Export por defecto requerido por Expo Router
export default function AuthClient() {
  return null;
}
