import { Platform } from 'react-native';

// Servicio para manejar la compatibilidad de juegos entre plataformas
export const GamePlatformService = {
  // Detectar plataforma actual
  getPlatform() {
    return Platform.OS;
  },

  // Verificar si es web
  isWeb() {
    return Platform.OS === 'web';
  },

  // Verificar si es móvil
  isMobile() {
    return Platform.OS === 'ios' || Platform.OS === 'android';
  },

  // Verificar si es Windows
  isWindows() {
    return Platform.OS === 'windows' || (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.platform && navigator.platform.includes('Win'));
  },

  // Obtener información de compatibilidad para cada juego
  getGameCompatibility(gameType: 'quiniela' | 'memorama' | 'executable') {
    const platform = this.getPlatform();
    
    switch (gameType) {
      case 'quiniela':
        return {
          supported: true,
          method: this.isWeb() ? 'new-tab' : 'webview',
          url: this.isWeb() ? '/FIFA2026_QuinielaEstilo.html' : 'FIFA2026_QuinielaEstilo.html',
          description: 'Juego de quiniela FIFA 2026',
          requirements: 'Navegador web o WebView'
        };
        
      case 'memorama':
        return {
          supported: true,
          method: this.isWeb() ? 'new-tab' : 'webview',
          url: this.isWeb() ? '/FIFA26Memorama.html' : 'FIFA26Memorama.html',
          description: 'Juego de memoria con temática FIFA',
          requirements: 'Navegador web o WebView'
        };
        
      case 'executable':
        return {
          supported: true, // Siempre mostrar como disponible
          method: this.isWeb() ? 'download' : 'download',
          url: null,
          description: 'Juego ejecutable para Windows',
          requirements: this.isWeb() ? 'Descarga disponible' : 'Solo para Windows',
          alternativeMessage: this.getExecutableAlternative()
        };
        
      default:
        return {
          supported: false,
          method: 'none',
          url: null,
          description: 'Juego no reconocido',
          requirements: 'N/A'
        };
    }
  },

  // Mensaje alternativo para el ejecutable según plataforma
  getExecutableAlternative() {
    if (this.isWeb()) {
      return 'Este juego requiere descarga. Los juegos web están disponibles arriba.';
    } else if (this.isMobile()) {
      return 'Este juego está disponible solo en Windows. Prueba los juegos HTML.';
    } else {
      return 'Descarga el archivo .exe para jugarlo.';
    }
  },

  // Abrir juego según la plataforma
  async openGame(gameType: 'quiniela' | 'memorama' | 'executable', router?: any) {
    const compatibility = this.getGameCompatibility(gameType);
    
    if (!compatibility.supported) {
      return {
        success: false,
        message: compatibility.alternativeMessage || 'Juego no compatible con esta plataforma'
      };
    }

    try {
      switch (compatibility.method) {
        case 'new-tab':
          if (typeof window !== 'undefined' && compatibility.url) {
            window.open(compatibility.url, '_blank');
            return { success: true, message: 'Juego abierto en nueva pestaña' };
          }
          break;
          
        case 'webview':
          if (router) {
            // Usar solo el nombre del archivo para la ruta
            const fileName = gameType === 'quiniela' ? 'FIFA2026_QuinielaEstilo.html' : 'FIFA26Memorama.html';
            router.push(`/games/webview?file=${encodeURIComponent(fileName)}`);
            return { success: true, message: 'Juego abierto en WebView' };
          }
          break;
          
        case 'download':
          return {
            success: true,
            message: 'Para jugar, descarga FIFA2026_SimpleGame.exe y ejecútalo directamente'
          };
          
        default:
          return { success: false, message: 'Método no implementado' };
      }
    } catch (error) {
      console.error('Error abriendo juego:', error);
      return { success: false, message: 'Error al abrir el juego' };
    }

    return { success: false, message: 'No se pudo abrir el juego' };
  },

  // Obtener lista de juegos compatibles para la plataforma actual
  getCompatibleGames() {
    const games = ['quiniela', 'memorama', 'executable'] as const;
    return games.map(game => ({
      type: game,
      ...this.getGameCompatibility(game)
    })).filter(game => game.supported);
  },

  // Obtener mensaje de estado de la plataforma
  getPlatformStatus() {
    const platform = this.getPlatform();
    const compatibleCount = this.getCompatibleGames().length;
    
    return {
      platform,
      isWeb: this.isWeb(),
      isMobile: this.isMobile(),
      isWindows: this.isWindows(),
      compatibleGamesCount: compatibleCount,
      totalGames: 3,
      message: this.getPlatformMessage(compatibleCount)
    };
  },

  // Mensaje descriptivo según la plataforma
  getPlatformMessage(compatibleCount: number) {
    if (this.isWeb()) {
      return `Plataforma Web: ${compatibleCount}/3 juegos disponibles. Los juegos HTML se abren en nuevas pestañas.`;
    } else if (this.isMobile()) {
      return `Plataforma Móvil: ${compatibleCount}/3 juegos disponibles. Los juegos HTML se abren en WebView integrado.`;
    } else if (this.isWindows()) {
      return `Plataforma Windows: ${compatibleCount}/3 juegos disponibles. Incluye el juego ejecutable nativo.`;
    } else {
      return `Plataforma ${this.getPlatform()}: ${compatibleCount}/3 juegos disponibles.`;
    }
  }
};
