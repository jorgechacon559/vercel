import { Platform } from 'react-native';

// Utilidad para obtener la URL del servidor de desarrollo
export const DevServerUtils = {
  // Obtener la URL base del servidor de desarrollo
  getDevServerUrl(): string {
    if (Platform.OS === 'web') {
      return window.location.origin;
    }
    
    // Para móvil en desarrollo, usar la IP del servidor actual
    if (__DEV__) {
      return 'http://192.168.1.69:8081';
    }
    
    // Fallback para producción (aunque no se usa en este caso)
    return 'http://localhost:8081';
  },

  // Construir URL para un archivo específico
  getFileUrl(fileName: string): string {
    const baseUrl = this.getDevServerUrl();
    return `${baseUrl}/${fileName}`;
  },

  // Verificar si estamos en modo desarrollo
  isDevelopment(): boolean {
    return __DEV__;
  }
};
