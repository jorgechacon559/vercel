import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import { SimpleGameService } from '../../utils/SimpleGameService';

export default function GamesScreenSimple() {
  const router = useRouter();
  const platformInfo = SimpleGameService.getPlatformInfo();
  const gamesList = SimpleGameService.getGamesList();

  // Función para jugar juegos HTML
  const handlePlayHTMLGame = async (gameFile: string) => {
    const result = await SimpleGameService.openHTMLGame(gameFile, router);
    
    if (!result.success) {
      Alert.alert('Error', result.message);
    }
  };

  // Función para el juego ejecutable
  const handleExecutableGame = () => {
    const execInfo = SimpleGameService.handleExecutableGame();
    
    if (execInfo.available) {
      Alert.alert(
        'Descargar Juego FIFA',
        `¿Deseas descargar el juego ejecutable? (${execInfo.size})`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Descargar', 
            onPress: () => {
              try {
                // Crear enlace de descarga
                const link = document.createElement('a');
                link.href = '/FIFA2026_SimpleGame.exe';
                link.download = 'FIFA2026_SimpleGame.exe';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                Alert.alert(
                  'Descarga iniciada',
                  'El archivo se está descargando. Verifica tu carpeta de descargas.',
                  [{ text: 'OK' }]
                );
              } catch (error) {
                console.error('Error en descarga:', error);
                Alert.alert(
                  'Error de descarga',
                  'No se pudo iniciar la descarga. Intenta acceder directamente al archivo.',
                  [{ text: 'OK' }]
                );
              }
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'No Disponible',
        execInfo.message,
        [{ text: 'Entendido' }]
      );
    }
  };

  // Manejar click en juego
  const handleGamePress = (game: any) => {
    if (game.type === 'html') {
      handlePlayHTMLGame(game.file);
    } else if (game.type === 'exe') {
      handleExecutableGame();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Juegos FIFA 2026</Text>
        <Text style={styles.subtitle}>¡Pon a prueba tus habilidades y diviértete!</Text>

        {/* Información de la plataforma */}
        <View style={styles.platformIndicator}>
          <Text style={styles.platformText}>
            📱 {platformInfo.message}
          </Text>
        </View>

        {/* Lista de juegos */}
        <View style={styles.gamesSection}>
          {gamesList.map((game) => (
            <TouchableOpacity 
              key={game.id}
              style={[styles.gameCard, getGameCardStyle(game.id)]} 
              onPress={() => handleGamePress(game)}
            >
              <View style={styles.gameHeader}>
                <Text style={styles.gameIcon}>{game.icon}</Text>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                  
                  <View style={styles.gameDetails}>
                    <Text style={styles.gameMethod}>
                      {game.method === 'new-tab' && '🌐 Se abre en nueva ventana'}
                      {game.method === 'webview' && '📱 Se abre en la app'}
                      {game.method === 'download' && `💾 Descarga (${game.size || ''})`}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {game.type === 'exe' ? 'EXE' : 'HTML5'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Información adicional */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Información</Text>
          <Text style={styles.infoText}>
            {platformInfo.isWeb && '🌐 En navegador: Los juegos HTML se abren en nuevas ventanas y puedes descargar el ejecutable.'}
            {platformInfo.isMobile && '📱 En móvil: Los juegos HTML funcionan perfectamente. El ejecutable solo está disponible para Windows.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Función auxiliar para obtener el estilo de cada card
function getGameCardStyle(gameId: string) {
  switch (gameId) {
    case 'quiniela':
      return { borderLeftColor: colors.secondary };
    case 'memorama':
      return { borderLeftColor: colors.accent };
    case 'executable':
      return { borderLeftColor: colors.blue };
    default:
      return { borderLeftColor: colors.primary };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  title: {
    ...commonStyles.title,
    textAlign: 'center',
    marginBottom: 8,
    color: colors.primary,
  },
  subtitle: {
    ...commonStyles.subtitle,
    textAlign: 'center',
    marginBottom: 32,
    color: colors.text,
  },
  platformIndicator: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  platformText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gamesSection: {
    marginBottom: 24,
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...commonStyles.shadowStrong,
    position: 'relative',
    borderLeftWidth: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  gameIcon: {
    fontSize: 32,
    marginRight: 12,
    marginTop: 4,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  gameDescription: {
    ...commonStyles.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  gameDetails: {
    marginTop: 8,
  },
  gameMethod: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  infoText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
});
