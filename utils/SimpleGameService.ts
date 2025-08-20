import { Platform } from 'react-native';
import { DevServerUtils } from './DevServerUtils';

// Servicio simplificado para manejar juegos
export const SimpleGameService = {
  // Obtener información de la plataforma
  getPlatformInfo() {
    const isWeb = Platform.OS === 'web';
    const isMobile = Platform.OS === 'android' || Platform.OS === 'ios';
    
    return {
      isWeb,
      isMobile,
      platform: Platform.OS,
      message: isWeb 
        ? 'Plataforma Web: Todos los juegos disponibles' 
        : 'Plataforma Móvil: Juegos HTML disponibles'
    };
  },

  // Abrir juego HTML
  async openHTMLGame(gameFile: string, router?: any) {
    const { isWeb } = this.getPlatformInfo();
    
    try {
      if (isWeb) {
        // En web: abrir en nueva ventana
        window.open(`/${gameFile}`, '_blank');
        return { success: true, message: 'Juego abierto en nueva ventana' };
      } else if (router) {
        // En móvil: usar WebView con servidor de desarrollo
        router.push(`/games/webview?file=${encodeURIComponent(gameFile)}`);
        return { success: true, message: 'Juego abierto en la app' };
      }
      
      return { success: false, message: 'No se pudo abrir el juego' };
    } catch (error) {
      console.error('Error abriendo juego:', error);
      return { success: false, message: 'Error al abrir el juego' };
    }
  },

  // Gestionar descarga del ejecutable
  handleExecutableGame() {
    const { isWeb } = this.getPlatformInfo();
    
    if (isWeb) {
      return {
        available: true,
        action: 'download',
        message: 'Disponible para descarga',
        size: '29 MB'
      };
    } else {
      return {
        available: false,
        action: 'info',
        message: 'Solo disponible en navegador web',
        size: '29 MB'
      };
    }
  },

  // Obtener lista de juegos
  getGamesList() {
    const platform = this.getPlatformInfo();
    
    return [
      {
        id: 'quiniela',
        title: 'Quiniela FIFA 2026',
        description: 'Predice los resultados del Mundial 2026',
        file: 'FIFA2026_QuinielaEstilo.html',
        type: 'html',
        icon: '🎯',
        available: true,
        method: platform.isWeb ? 'new-tab' : 'webview'
      },
      {
        id: 'memorama',
        title: 'Memorama FIFA',
        description: 'Juego de memoria con cartas FIFA',
        file: 'FIFA26Memorama.html',
        type: 'html',
        icon: '🧠',
        available: true,
        method: platform.isWeb ? 'new-tab' : 'webview'
      },
      {
        id: 'executable',
        title: 'Juego Simple FIFA',
        description: 'Juego ejecutable para Windows',
        file: 'FIFA2026_SimpleGame.exe',
        type: 'exe',
        icon: '🕹️',
        available: true, // Siempre mostrar como disponible
        method: 'download',
        size: '29 MB'
      }
    ];
  }
};
